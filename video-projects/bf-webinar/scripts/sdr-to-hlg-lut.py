#!/usr/bin/env python3
"""Build a 3D LUT that places sRGB/BT.709 SDR graphics into BT.2020 HLG exactly (ITU-R BT.2408).

The HyperFrames HDR compositor over-saturates SDR DOM layers (flame #FF4C32 came out ~#FF0001,
navy #06284C ~#00539C). We instead render the graphics as an SDR alpha layer and convert it
ourselves with this LUT, then overlay it on the untouched HLG A-roll.

Mapping per BT.2408: SDR reference white -> 203 cd/m2 on a 1000 cd/m2 HLG display (signal 0.75).
  1. sRGB decode -> linear BT.709
  2. BT.709 -> BT.2020 primaries (linear)
  3. display light Fd = lin * 203/1000
  4. inverse HLG OOTF (gamma 1.2): E = Fd / Ys^(gamma-1), Ys = Yd^(1/gamma)
  5. HLG OETF -> non-linear BT.2020 RGB (the LUT output; matrix to YCbCr is done by zscale)

usage: python3 scripts/sdr-to-hlg-lut.py [out.cube] [size]
"""
import sys
import numpy as np

out = sys.argv[1] if len(sys.argv) > 1 else "sdr-to-hlg.cube"
N = int(sys.argv[2]) if len(sys.argv) > 2 else 65

def srgb_decode(v):
    return np.where(v <= 0.04045, v / 12.92, ((v + 0.055) / 1.055) ** 2.4)

M709_2020 = np.array([[0.6274, 0.3293, 0.0433],
                      [0.0691, 0.9195, 0.0114],
                      [0.0164, 0.0880, 0.8956]])
GAMMA, SDR_WHITE, PEAK = 1.2, 203.0, 1000.0
a, b = 0.17883277, 0.28466892
c = 0.5 - a * np.log(4 * a)

def hlg_oetf(e):
    e = np.clip(e, 0, 1)
    return np.where(e <= 1 / 12, np.sqrt(3 * e), a * np.log(np.maximum(12 * e - b, 1e-12)) + c)

def convert(rgb):
    lin = srgb_decode(rgb) @ M709_2020.T
    fd = np.clip(lin, 0, None) * (SDR_WHITE / PEAK)
    yd = fd @ np.array([0.2627, 0.6780, 0.0593])
    ys = np.power(np.maximum(yd, 1e-12), 1 / GAMMA)
    e = fd / np.power(ys, GAMMA - 1)[:, None]
    return hlg_oetf(e)

if __name__ == "__main__":
    g = np.linspace(0, 1, N)
    B, G, R = np.meshgrid(g, g, g, indexing="ij")  # .cube order: red varies fastest
    grid = np.stack([R.ravel(), G.ravel(), B.ravel()], 1)
    lut = convert(grid)
    with open(out, "w") as f:
        f.write(f'TITLE "sRGB SDR -> BT.2020 HLG (BT.2408, 203 nit ref white)"\nLUT_3D_SIZE {N}\n')
        for v in lut:
            f.write("%.6f %.6f %.6f\n" % tuple(v))
    print(f"wrote {out} ({N}^3); white ->", convert(np.array([[1.0, 1.0, 1.0]]))[0].round(4))
