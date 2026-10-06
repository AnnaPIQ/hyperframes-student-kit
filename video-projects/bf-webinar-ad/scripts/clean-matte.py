"""Drop small detached islands from an alpha matte (e.g. LED-wall letters the
person-segmentation model picked up next to Sean on the Shoptalk stage).

Reads raw 8-bit gray alpha frames on stdin, writes cleaned frames to stdout.
Usage: ... | python3 -I scripts/clean-matte.py W H | ...
Keeps every connected region whose area is at least KEEP_FRAC of the largest.
"""
import sys
from collections import deque

import numpy as np

W, H = int(sys.argv[1]), int(sys.argv[2])
DS = 4            # label on a 4x-downsampled grid for speed
KEEP_FRAC = 0.04  # islands smaller than 4% of the main body are removed
FRAME = W * H
src, dst = sys.stdin.buffer, sys.stdout.buffer


def label(mask):
    h, w = mask.shape
    lab = np.zeros((h, w), dtype=np.int32)
    sizes = [0]
    cur = 0
    for y0, x0 in zip(*np.nonzero(mask)):
        if lab[y0, x0]:
            continue
        cur += 1
        lab[y0, x0] = cur
        q = deque([(y0, x0)])
        n = 0
        while q:
            y, x = q.popleft()
            n += 1
            for yy, xx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
                if 0 <= yy < h and 0 <= xx < w and mask[yy, xx] and not lab[yy, xx]:
                    lab[yy, xx] = cur
                    q.append((yy, xx))
        sizes.append(n)
    return lab, np.array(sizes)


while True:
    buf = src.read(FRAME)
    if len(buf) < FRAME:
        break
    a = np.frombuffer(buf, dtype=np.uint8).reshape(H, W)
    small = a[: H - H % DS, : W - W % DS].reshape(H // DS, DS, W // DS, DS).max(axis=(1, 3)) > 24
    lab, sizes = label(small)
    if len(sizes) > 1:
        keep_ids = np.nonzero(sizes >= KEEP_FRAC * sizes.max())[0]
        keep_ids = keep_ids[keep_ids > 0]
        keep = np.isin(lab, keep_ids)
        # grow the keep mask by one cell so soft edges survive, then upsample
        k = keep.copy()
        k[1:, :] |= keep[:-1, :]; k[:-1, :] |= keep[1:, :]
        k[:, 1:] |= keep[:, :-1]; k[:, :-1] |= keep[:, 1:]
        full = np.zeros((H, W), dtype=bool)
        full[: k.shape[0] * DS, : k.shape[1] * DS] = np.repeat(np.repeat(k, DS, 0), DS, 1)
        a = np.where(full, a, 0).astype(np.uint8)
    dst.write(a.tobytes())
