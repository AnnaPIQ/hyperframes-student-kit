import numpy as np, wave, sys
SR=48000; DUR=31.0; N=int(SR*DUR); rng=np.random.default_rng(7)
def t_(d): return np.arange(int(SR*d))/SR
def put(buf,t,x,g=1.0):
    i=int(t*SR); x=x[:max(0,len(buf)-i)]; buf[i:i+len(x)]+=x*g
def lp(x,a):  # one-pole lowpass, a in (0,1)
    y=np.empty_like(x); s=0.0
    for i,v in enumerate(x): s+=a*(v-s); y[i]=s
    return y
def save(name,x,peak):
    x=x/ (np.max(np.abs(x))+1e-9) * peak
    st=np.stack([x,x],1); d=(st*32767).astype('<i2')
    w=wave.open(name,'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(d.tobytes()); w.close()
# ---------- SFX ----------
sfx=np.zeros(N)
def click(f=2400,d=0.035):
    t=t_(d); return (np.sin(2*np.pi*f*t)*0.7+rng.standard_normal(len(t))*0.15)*np.exp(-t/0.008)
def tick(f=3600): t=t_(0.02); return np.sin(2*np.pi*f*t)*np.exp(-t/0.004)
def impact(strength=1.0):
    t=t_(0.45); f=90*np.exp(-t/0.12)+45
    body=np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t/(0.10+0.06*strength))
    air=lp(rng.standard_normal(len(t)),0.05)*np.exp(-t/0.05)*0.6
    return (body+air)*strength
def tone():
    t=t_(0.6); return (np.sin(2*np.pi*880*t)+0.5*np.sin(2*np.pi*1320*t)+0.25*np.sin(2*np.pi*1760*t))*np.exp(-t/0.18)*np.minimum(1,t/0.004)
for tt in (5.10,5.30,5.50): put(sfx,tt,click(),0.55)
put(sfx,5.98,tick(2800),0.25)
put(sfx,8.14,impact(0.8),0.8); put(sfx,9.04,impact(1.25),0.95)
for k in range(9): put(sfx,14.48+k*0.0725,tick(3000+k*60),0.28)
put(sfx,15.06,tone(),0.32)
put(sfx,19.70,click(3000,0.03),0.35); put(sfx,21.78,tick(2600),0.35)
put(sfx,23.84,click(1800,0.03),0.45); put(sfx,23.92,click(2700,0.03),0.45)
put(sfx,25.04,click(1400,0.05)+np.pad(click(2800,0.04),(0,int(SR*0.01))) [:len(click(1400,0.05))],0.5)
save(sys.argv[1]+'/sfx.wav',sfx,0.7)
# ---------- music bed (placeholder) ----------
mus=np.zeros(N); T=np.arange(N)/SR
BEAT=60/108; BAR=BEAT*4
chords=[[110,164.81,246.94,261.63,392.0],[87.31,130.81,164.81,220.0,329.63],[98.0,146.83,196.0,246.94,293.66],[110,164.81,220,261.63,329.63]]
pad=np.zeros(N)
for ci in range(int(DUR/(BAR*2))+1):
    s=ci*BAR*2; ch=chords[ci%4]
    seg=t_(BAR*2+0.6); env=np.minimum(1,seg/0.5)*np.minimum(1,np.maximum(0,(BAR*2+0.6-seg)/0.6))
    x=sum(np.sin(2*np.pi*f*seg)+0.3*np.sin(2*np.pi*f*2.003*seg) for f in ch)/len(ch)
    put(pad,s,x*env)
pad*=0.75+0.25*np.sin(2*np.pi*0.25*T)
kick=np.zeros(N); hat=np.zeros(N); bass=np.zeros(N)
nb=int(DUR/BEAT)+1
for b in range(nb):
    tb=b*BEAT
    kt=t_(0.3); f=110*np.exp(-kt/0.03)+48
    put(kick,tb,np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-kt/0.11))
    ht=t_(0.05); n=rng.standard_normal(len(ht)); n=n-lp(n,0.3)
    put(hat,tb+BEAT/2,n*np.exp(-ht/0.012))
    root=chords[int(tb//(BAR*2))%4][0]
    bt=t_(BEAT*0.9); put(bass,tb,np.sin(2*np.pi*root*bt)*np.exp(-bt/0.25))
mus=pad*0.55+kick*0.55+hat*0.10+bass*0.35
# arrangement: intro softer, end card lift, clean end
lvl=np.interp(T,[0,0.4,5,26.6,27.0,30.6,31.0],[0.0,0.7,0.85,0.85,1.0,1.0,0.0])
mus*=lvl
save(sys.argv[1]+'/music.wav',mus,0.8)
