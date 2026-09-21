#!/usr/bin/env python3
"""
prep-vo.py — normalise Sean's voiceover to broadcast/social loudness.

  python3 scripts/prep-vo.py <source-audio>     # e.g. the original .aifc from Drive

The raw recording lands at about -32.6 LUFS integrated, roughly 16 dB under the
~-14 LUFS that Meta and TikTok normalise toward. Left alone the ad plays
noticeably quieter than everything around it in the feed, which for an ad is a
real problem, so the fix belongs in the asset rather than in a post-step on the
rendered MP4 that the next re-render would silently drop.

Two-pass loudnorm. A flat gain will not do it: the recording measures -32.6 LUFS
integrated against a -8.2 dBTP true peak, a ~24 dB crest, so lifting it by ear
alone would clip hard. loudnorm limits the peaks instead.

loudnorm only changes level over time, never timing, so word onsets in
assets/sean-vo.transcript.json survive it. The AAC encoder is the thing that
moves: it pads the final frame, which stretched the file by 72ms on the first
run. The output is therefore hard-trimmed back to the source duration (that tail
is silence - the last word ends at 66.76s), and both the duration AND the speech
onset are asserted afterwards, because every beat in the composition is anchored
to this file.
"""
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "sean-vo.m4a"
TARGET_I, TARGET_TP, TARGET_LRA = -14.0, -1.5, 11.0


def probe_duration(path):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                        "-of", "csv=p=0", str(path)], capture_output=True, text=True, check=True)
    return float(r.stdout.strip())


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    src = Path(sys.argv[1])
    if not src.exists():
        sys.exit(f"missing source audio: {src}")

    src_dur = probe_duration(src)
    print(f"source: {src.name}  {src_dur:.3f}s")

    # Pass 1 - measure.
    p1 = subprocess.run(
        ["ffmpeg", "-hide_banner", "-nostats", "-i", str(src),
         "-af", f"loudnorm=I={TARGET_I}:TP={TARGET_TP}:LRA={TARGET_LRA}:print_format=json",
         "-f", "null", "/dev/null"],
        capture_output=True, text=True)
    blob = p1.stderr[p1.stderr.rindex("{"):p1.stderr.rindex("}") + 1]
    m = json.loads(blob)
    print(f"  measured: {m['input_i']} LUFS integrated, {m['input_tp']} dBTP")

    # Pass 2 - apply a static gain using the pass-1 measurements.
    af = (f"loudnorm=I={TARGET_I}:TP={TARGET_TP}:LRA={TARGET_LRA}:"
          f"measured_I={m['input_i']}:measured_TP={m['input_tp']}:"
          f"measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:"
          f"offset={m['target_offset']}:linear=true:print_format=summary")
    subprocess.run(
        ["ffmpeg", "-y", "-v", "error", "-i", str(src), "-af", af,
         "-t", f"{src_dur:.6f}", "-ar", "48000", "-ac", "1",
         "-c:a", "aac", "-b:a", "192k", str(OUT)],
        check=True)

    out_dur = probe_duration(OUT)
    drift = abs(out_dur - src_dur)
    print(f"wrote {OUT.name}  {out_dur:.3f}s  (drift {drift*1000:.1f}ms)")
    if drift > 0.02:
        sys.exit(f"ERROR: duration drifted {drift:.3f}s - every beat timing is "
                 f"anchored to this file, do not ship it")

    # A shifted speech onset would slide every graphic off its word, and encoder
    # priming is exactly the kind of thing that causes it. Compare both files.
    def onset(path):
        r = subprocess.run(
            ["ffmpeg", "-hide_banner", "-nostats", "-i", str(path),
             "-af", "silencedetect=noise=-50dB:d=0.02", "-f", "null", "/dev/null"],
            capture_output=True, text=True)
        for line in r.stderr.splitlines():
            if "silence_end" in line:
                return float(line.split("silence_end:")[1].split("|")[0])
        return 0.0

    shift = abs(onset(OUT) - onset(src))
    print(f"  speech onset shift: {shift*1000:.1f}ms")
    if shift > 0.02:
        sys.exit(f"ERROR: speech onset moved {shift*1000:.1f}ms - graphics would "
                 f"drift off their words")

    out = subprocess.run(
        ["ffmpeg", "-hide_banner", "-nostats", "-i", str(OUT),
         "-af", "loudnorm=print_format=json", "-f", "null", "/dev/null"],
        capture_output=True, text=True).stderr
    res = json.loads(out[out.rindex("{"):out.rindex("}") + 1])
    print(f"  result: {res['input_i']} LUFS integrated, {res['input_tp']} dBTP")


if __name__ == "__main__":
    main()
