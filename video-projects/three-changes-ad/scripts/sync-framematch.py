# framematch.py <render> <prep aroll> <x> <y> <scale> <render_t>... : finds which prep frame each render frame shows
import sys, subprocess, numpy as np
R,P=sys.argv[1],sys.argv[2]; x,y,s=float(sys.argv[3]),float(sys.argv[4]),float(sys.argv[5])
def grab(f,t,vf):
    raw=subprocess.run(['ffmpeg','-v','error','-ss',f'{t:.3f}','-i',f,'-frames:v','1','-vf',vf+',scale=135:240,format=gray','-f','rawvideo','-'],capture_output=True).stdout
    return np.frombuffer(raw,np.uint8).astype(float)
W,H=round(1366*s),round(1920*s)
tf=f'scale={W}:{H},crop=1080:1920:{round(-x)}:{round(-y)}'
for rt in map(float,sys.argv[6:]):
    r=grab(R,rt,'null')
    best=min(((np.mean((grab(P,rt+0.48+k*0.04,tf)-r)**2),k*0.04) for k in range(-5,6)))
    print(f'render {rt:.2f}s shows source {rt+0.48+best[1]:.2f}s  (offset vs expected {best[1]:+.2f}s, mse {best[0]:.1f})')
