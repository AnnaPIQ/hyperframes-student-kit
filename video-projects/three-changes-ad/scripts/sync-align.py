# align.py <render> <r_t0> <source> <s_t0> <dur> <r_crop> <s_crop> ; prints video lag and audio lag (seconds, + = render later than expected)
import sys, subprocess, numpy as np
R,rt,Sv,st,dur,rc,sc=sys.argv[1],float(sys.argv[2]),sys.argv[3],float(sys.argv[4]),float(sys.argv[5]),sys.argv[6],sys.argv[7]
FPS=100; PAD=0.4
def motion(f,t0,crop):
    raw=subprocess.run(['ffmpeg','-v','error','-ss',str(t0),'-i',f,'-t',str(dur),'-vf',f'crop={crop},scale=96:96,fps={FPS},format=gray','-f','rawvideo','-'],capture_output=True).stdout
    fr=np.frombuffer(raw,np.uint8).reshape(-1,96,96).astype(float)
    return np.abs(np.diff(fr,axis=0)).mean(axis=(1,2))
def env(f,t0):
    au=subprocess.run(['ffmpeg','-v','error','-ss',str(t0),'-i',f,'-t',str(dur),'-vn','-ac','1','-ar','16000','-f','s16le','-'],capture_output=True).stdout
    a=np.frombuffer(au,np.int16).astype(float); n=16000//FPS
    return np.array([np.sqrt((a[i*n:(i+1)*n]**2).mean()) for i in range(len(a)//n)])
def lag(x,y,maxl):
    m=min(len(x),len(y)); x=(x[:m]-x[:m].mean())/x[:m].std(); y=(y[:m]-y[:m].mean())/y[:m].std(); res=[]
    for l in range(-maxl,maxl+1):
        if l>=0: c=np.corrcoef(x[:m-l],y[l:])[0,1]
        else: c=np.corrcoef(x[-l:],y[:m+l])[0,1]
        res.append((c,l))
    c,l=max(res); return l/FPS,c
vl,vc=lag(motion(Sv,st,sc),motion(R,rt,rc),int(PAD*FPS))
al,ac=lag(env(Sv,st),env(R,rt),int(PAD*FPS))
print(f'video lag {vl:+.3f}s (r={vc:.2f})   audio lag {al:+.3f}s (r={ac:.2f})   => A/V offset (audio minus video) {al-vl:+.3f}s')
