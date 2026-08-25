import struct, json
SC="/tmp/claude-0/-home-user-hyperframes-student-kit/c3f63d15-29e1-5c18-be4c-357fef94fbef/scratchpad"
d=open(f'{SC}/moov.bin','rb').read()

def atoms(buf,s,e):
    o=s
    while o+8<=e:
        size=struct.unpack(">I",buf[o:o+4])[0]; typ=buf[o+4:o+8].decode("latin1"); h=8
        if size==1: size=struct.unpack(">Q",buf[o+8:o+16])[0]; h=16
        elif size==0: size=e-o
        if size<h: break
        yield typ,o+h,o+size
        o+=size
C={"moov","trak","mdia","minf","stbl","edts","udta","dinf"}
def walk(buf,s,e,path=()):
    for t,ps,pe in atoms(buf,s,e):
        yield path+(t,),ps,pe
        if t in C: yield from walk(buf,ps,pe,path+(t,))

traks=[(ps,pe) for p,ps,pe in walk(d,0,len(d)) if p==("moov","trak")]
# audio trak = the one whose stsd format is lpcm (index 1 from the probe)
ts,te=traks[1]
T={}
for p,ps,pe in walk(d,ts,te):
    T[p[-1]]=(ps,pe)

# sound description details
ps,pe=T["stsd"]; e0=ps+8
fmt=d[e0+4:e0+8].decode("latin1")
sndver=struct.unpack(">H",d[e0+16:e0+18])[0]
ch=struct.unpack(">H",d[e0+24:e0+26])[0]
bits=struct.unpack(">H",d[e0+26:e0+28])[0]
sr=struct.unpack(">I",d[e0+32:e0+36])[0]>>16
print(f"fmt={fmt} sndver={sndver} ch={ch} bits={bits} sr={sr}")
if sndver==2:
    # v2 layout: after 28 bytes of v0 fields -> sizeOfStructOnly, sampleRate(f64), numChannels, ...
    sr64=struct.unpack(">d",d[e0+32:e0+40])[0]
    nch=struct.unpack(">I",d[e0+44:e0+48])[0]
    flags=struct.unpack(">I",d[e0+48:e0+52])[0]
    bpf=struct.unpack(">I",d[e0+52:e0+56])[0]
    spf=struct.unpack(">I",d[e0+56:e0+60])[0]
    print(f"  v2: sr={sr64} nch={nch} formatFlags={flags} bytesPerFrame={bpf} samplesPerFrame={spf}")

# stsz
ps,pe=T["stsz"]; fixed=struct.unpack(">I",d[ps+4:ps+8])[0]; nsamp=struct.unpack(">I",d[ps+8:ps+12])[0]
# stsc: (first_chunk, samples_per_chunk, desc_id)
ps,pe=T["stsc"]; n=struct.unpack(">I",d[ps+4:ps+8])[0]
stsc=[struct.unpack(">III",d[ps+8+i*12:ps+20+i*12]) for i in range(n)]
# stco
ps,pe=T["stco"]; ncho=struct.unpack(">I",d[ps+4:ps+8])[0]
stco=[struct.unpack(">I",d[ps+8+i*4:ps+12+i*4])[0] for i in range(ncho)]
print(f"fixed_sample_size={fixed} nsamples={nsamp} nchunks={ncho} stsc_entries={n}")

# expand stsc -> samples per chunk for every chunk
spc=[0]*ncho
for i,(first,sp,_) in enumerate(stsc):
    last = stsc[i+1][0]-1 if i+1<len(stsc) else ncho
    for c in range(first,last+1):
        spc[c-1]=sp
ranges=[]
total=0
for i,off in enumerate(stco):
    nb=spc[i]*fixed
    ranges.append((off,nb)); total+=nb
print(f"total_audio_bytes={total} ({total/1e6:.2f} MB)  expected={nsamp*fixed}")
json.dump({"ranges":ranges,"fixed":fixed,"nsamp":nsamp,"sr":sr,"ch":ch,"bits":bits,
           "fmt":fmt,"sndver":sndver}, open(f'{SC}/audio_ranges.json','w'))
print("wrote audio_ranges.json")
