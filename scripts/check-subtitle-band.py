import subprocess, sys, os
# Verifies the reserved subtitle band carries no graphics: on every card/scene
# beat the band must be near-solid brand navy (#06284C). Samples the whole
# timeline, not just the beats we designed for.
mp4, W, H, BAND = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4])
NAVY = (0x06, 0x28, 0x4C)
times = [round(t*0.5, 2) for t in range(2, 105)]  # every 0.5s, 1.0s..52.0s
bad = []
for t in times:
    raw = subprocess.run(
        ["ffmpeg","-nostdin","-v","error","-ss",str(t),"-i",mp4,"-frames:v","1",
         "-vf","crop=%d:%d:0:%d"%(W,BAND,H-BAND),"-pix_fmt","rgb24","-f","rawvideo","-"],
        capture_output=True).stdout
    if len(raw) < W*BAND*3:
        bad.append((t,"no frame")); continue
    near = 0
    total = W*BAND
    # sample every 4th pixel for speed
    step = 4
    cnt = 0
    for i in range(0, total, step):
        p = i*3
        d = abs(raw[p]-NAVY[0]) + abs(raw[p+1]-NAVY[1]) + abs(raw[p+2]-NAVY[2])
        if d <= 24: near += 1
        cnt += 1
    frac = near/cnt
    if frac < 0.995:
        bad.append((t, round(frac,4)))
print("sampled %d timestamps across %s" % (len(times), os.path.basename(mp4)))
if not bad:
    print("PASS — band is solid navy at every sample, no graphics intrude")
else:
    print("non-uniform band at %d sample(s):" % len(bad))
    for t,f in bad: print("   t=%-6s near-navy fraction %s" % (t,f))
