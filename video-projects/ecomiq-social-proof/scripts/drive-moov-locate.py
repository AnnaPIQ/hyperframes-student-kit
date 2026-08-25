import subprocess, struct, sys, time

FID = "1WyK-Gg6_MWcsOny0abvOJx1niEvz6Ea7"
URL = f"https://drive.usercontent.google.com/download?id={FID}&export=download&confirm=t"
TOTAL = 2539881477

def fetch(start, end, tries=40):
    """Range-fetch [start,end] inclusive, retrying through Drive's quota interstitial."""
    want = end - start + 1
    for t in range(tries):
        p = subprocess.run(["curl","-s","-A","Mozilla/5.0","-r",f"{start}-{end}",URL],
                           capture_output=True)
        d = p.stdout
        if len(d) == want and not d.lstrip()[:9].startswith(b"<!DOCTYPE"):
            return d
        wait = min(15 + t*10, 90)
        print(f"   throttled at {start} (got {len(d)}/{want}) wait {wait}s", flush=True)
        time.sleep(wait)
    raise SystemExit(f"blocked fetching {start}-{end}")

off = 0
while off < TOTAL:
    hdr = fetch(off, off+31)
    size = struct.unpack(">I", hdr[0:4])[0]
    typ  = hdr[4:8].decode("latin1")
    hsz  = 8
    if size == 1:                      # 64-bit extended size
        size = struct.unpack(">Q", hdr[8:16])[0]; hsz = 16
    elif size == 0:                    # extends to EOF
        size = TOTAL - off
    print(f"atom {typ!r:8} offset={off} size={size}", flush=True)
    if typ == "moov":
        print(f"MOOV_OFFSET={off}\nMOOV_SIZE={size}", flush=True)
        break
    off += size
