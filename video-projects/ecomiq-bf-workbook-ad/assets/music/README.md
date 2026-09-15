# Music bed slot

`music-bed.m4a` is a **silent 53.0s placeholder**, already wired into both
compositions as a sibling `<audio data-volume="0.14">`.

To drop a real track in, overwrite this file at the same path:

```bash
ffmpeg -y -i <track>.mp3 -t 53.0 -af "loudnorm=I=-26:TP=-3:LRA=8,afade=t=out:st=51:d=2" \\
  -ar 48000 -ac 2 -c:a aac -b:a 160k assets/music/music-bed.m4a
```

-26 LUFS against the VO's -16 LUFS gives roughly 10 dB of headroom, which is a
normal bed level under a voice. Adjust `data-volume` in the compositions if you
want it further back.
