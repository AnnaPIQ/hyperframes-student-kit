# Subtle, sparse SFX bed for the ad (synthesised, deterministic). Usage: python3 make-sfx.py <outdir>
import numpy as np, wave, sys
SR=48000; DUR=34.12; N=int(SR*DUR); rng=np.random.default_rng(7)
def t_(d): return np.arange(int(SR*d))/SR
def put(buf,t,x,g=1.0):
    i=int(t*SR); x=x[:max(0,len(buf)-i)]; buf[i:i+len(x)]+=x*g
def lp(x,a):
    y=np.empty_like(x); s=0.0
    for i,v in enumerate(x): s+=a*(v-s); y[i]=s
    return y
def click(f=2200,d=0.04): t=t_(d); return (np.sin(2*np.pi*f*t)*0.7+rng.standard_normal(len(t))*0.1)*np.exp(-t/0.007)
def tick(f=3200): t=t_(0.02); return np.sin(2*np.pi*f*t)*np.exp(-t/0.004)
def marker(f=660):  # soft rounded "dot lands" tone
    t=t_(0.5); return (np.sin(2*np.pi*f*t)+0.35*np.sin(2*np.pi*f*1.5*t))*np.exp(-t/0.12)*np.minimum(1,t/0.006)
def ui(f=1050):     # gentle UI blip, two quick partials
    t=t_(0.28); return (np.sin(2*np.pi*f*t)*np.exp(-t/0.06)+0.5*np.sin(2*np.pi*f*2*t)*np.exp(-t/0.03))*np.minimum(1,t/0.004)
def swish(d=0.6):   # light line movement: filtered noise swell
    t=t_(d); n=lp(rng.standard_normal(len(t)),0.08); env=np.sin(np.pi*t/d)**2; return n*env
sfx=np.zeros(N)
put(sfx,5.20,click(),0.35)                     # ORDER #1
put(sfx,5.36,swish(0.6),0.30)                   # journey line draws
put(sfx,5.92,marker(660),0.30)                  # ORDER #2
put(sfx,9.60,swish(0.8),0.22)                   # connector draws
for tt,f in ((12.24,980),(12.92,1100),(13.48,1240)): put(sfx,tt,ui(f),0.24)   # EMAIL / OFFER / FOLLOW-UP
for k in range(12): put(sfx,18.70+k*0.0625*(1+k*0.04),tick(2900+k*40),0.16)    # +41% count-up
put(sfx,19.45,marker(880),0.26)                 # count lands
put(sfx,23.16,marker(660),0.30)                 # ORDER #2 callback
put(sfx,31.24,click(1600,0.05),0.40)            # BOOK NOW
x=sfx/(np.max(np.abs(sfx))+1e-9)*0.32           # peak about -10 dBFS, VO sits well above
st=np.stack([x,x],1); d=(st*32767).astype('<i2')
w=wave.open(sys.argv[1]+'/sfx.wav','wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(d.tobytes()); w.close()
