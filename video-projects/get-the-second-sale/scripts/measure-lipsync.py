# Lip-sync check: face-landmark mouth opening vs voice envelope, cross-correlated at 10ms steps.
# Usage: python3 measure-lipsync.py <video> <face_landmarker.task> "start:end,start:end" [crop w:h:x:y]
# Positive best lag = voice after the mouth (natural, keep within ~40ms). Negative = voice early.
# Model: https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task
import sys, subprocess, numpy as np, wave, mediapipe as mp
from mediapipe.tasks.python import vision, BaseOptions
vid, model = sys.argv[1], sys.argv[2]
segs = [tuple(map(float, x.split(':'))) for x in sys.argv[3].split(',')]   # edit-time Sean segments
crop = sys.argv[4] if len(sys.argv) > 4 else '760:900:0:300'
FPS = 25; W, H = [int(v) for v in crop.split(':')[:2]]
det = vision.FaceLandmarker.create_from_options(vision.FaceLandmarkerOptions(
    base_options=BaseOptions(model_asset_path=model), running_mode=vision.RunningMode.IMAGE, num_faces=1))
# audio at 16k
a = subprocess.run(['ffmpeg','-nostdin','-v','error','-i',vid,'-ac','1','-ar','16000','-f','s16le','-'],capture_output=True).stdout
a = np.frombuffer(a, np.int16).astype(np.float32)/32768
def env_at(t):  # RMS in 40ms centred window
    i = int(t*16000); h = 320
    x = a[max(0,i-h):i+h]; return np.sqrt(np.mean(x**2)) if len(x) else 0
allA, allE = [], []
for (s0, s1) in segs:
    s0 += 0.08; s1 -= 0.08   # stay clear of cut frames
    raw = subprocess.run(['ffmpeg','-nostdin','-v','error','-ss',str(s0),'-i',vid,'-t',str(s1-s0),
        '-vf',f'crop={crop},fps={FPS}','-f','rawvideo','-pix_fmt','rgb24','-'],capture_output=True).stdout
    fr = np.frombuffer(raw, np.uint8).reshape(-1, H, W, 3)
    ap = []
    for f in fr:
        r = det.detect(mp.Image(image_format=mp.ImageFormat.SRGB, data=np.ascontiguousarray(f)))
        if not r.face_landmarks: ap.append(np.nan); continue
        L = r.face_landmarks[0]
        face_h = abs(L[152].y - L[10].y)
        ap.append(abs(L[14].y - L[13].y) / face_h)
    ap = np.array(ap); ts = s0 + np.arange(len(ap))/FPS
    good = ~np.isnan(ap)
    print(f'segment {s0-0.08:.2f}-{s1+0.08:.2f}: {len(ap)} frames, face found {good.mean()*100:.0f}%')
    # resample to 100 Hz for sub-frame lag
    t100 = np.arange(ts[0], ts[-1], 0.01)
    allA.append(np.interp(t100, ts[good], ap[good]))
    allE.append(np.array([env_at(t) for t in t100]))
def z(x): return (x - x.mean())/(x.std()+1e-9)
res = []
for lag in range(-30, 31):   # lag in 10ms. positive = audio comes AFTER the mouth
    num = 0; den = 0
    for A, E in zip(allA, allE):
        if lag >= 0: x, y = A[:len(A)-lag], E[lag:]
        else: x, y = A[-lag:], E[:len(E)+lag]
        num += np.sum(z(x)*z(y)); den += len(x)
    res.append((lag*10, num/den))
res.sort(key=lambda r: -r[1])
print('best lags (ms, corr):', [(l, round(c, 3)) for l, c in res[:6]])
print('corr at 0ms:', round(dict(res)[0], 3))
