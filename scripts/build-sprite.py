"""
build-sprite.py — Extract sprites from duck.png, remove ONLY the magenta background.
Uses tight color matching to avoid eating the beak.
"""
from PIL import Image
import numpy as np, json

SRC = "public/static/images/duck.png"
OUT = "public/static/images/goose-sprite-final"

img = Image.open(SRC).convert("RGBA")
a = np.array(img, dtype=np.int16)
h, w = a.shape[:2]

# The background is magenta: R~230, G~5-15, B~230
# Only match this specific color range — nothing else
def is_magenta_bg(arr):
    r, g, b = arr[:,:,0], arr[:,:,1], arr[:,:,2]
    return (r > 180) & (g < 50) & (b > 180)

def has_orange_neighbor(arr, y, x):
    """Check if any of the 8 neighbors is orange-ish."""
    sh, sw = arr.shape[:2]
    for dy in [-1, 0, 1]:
        for dx in [-1, 0, 1]:
            if dy == 0 and dx == 0: continue
            ny, nx = y + dy, x + dx
            if 0 <= ny < sh and 0 <= nx < sw:
                if arr[ny, nx, 3] > 0:
                    r, g, b = int(arr[ny,nx,0]), int(arr[ny,nx,1]), int(arr[ny,nx,2])
                    if r > 140 and r > b + 30 and g < 200:
                        return True
    return False

def kill_bg(sprite_arr):
    """Remove magenta background only. Gentle edge cleanup that protects orange."""
    s = sprite_arr.copy()
    sh, sw = s.shape[:2]
    
    # Step 1: Kill all clear magenta bg pixels
    s[is_magenta_bg(s), 3] = 0
    
    # Step 2: Kill semi-magenta pixels (slightly darker/lighter bg)
    r, g, b = s[:,:,0], s[:,:,1], s[:,:,2]
    op = s[:,:,3] > 0
    semi_mag = op & (r > 150) & (g < 70) & (b > 150) & (np.abs(r - b) < 50)
    s[semi_mag, 3] = 0
    
    # Step 3: Gentle edge erosion — ONLY 2 passes, ONLY for clearly purple edge pixels
    # NEVER touch pixels near orange
    for _ in range(2):
        al = s[:,:,3]
        pad = np.pad(al, 1, constant_values=0)
        tn = sum(
            (pad[1+dy:1+dy+sh, 1+dx:1+dx+sw] == 0).astype(np.int16)
            for dy in [-1,0,1] for dx in [-1,0,1] if not (dy==0 and dx==0)
        )
        r2, g2, b2 = s[:,:,0], s[:,:,1], s[:,:,2]
        op2 = s[:,:,3] > 0
        # Only kill edge pixels that are clearly magenta-tinted (not orange at all)
        # Magenta tint: R and B both high, G very low, R and B close together
        magenta_edge = op2 & (tn >= 3) & (r2 > 120) & (b2 > 120) & (g2 < 50) & (np.abs(r2 - b2) < 60)
        if not magenta_edge.any(): break
        s[magenta_edge, 3] = 0
    
    return s

# === FIND GRID ===
print("Scanning grid...")
bm = is_magenta_bg(a)
row_bg = [bm[y, ::3].all() for y in range(h)]
seps = []
ins = False; st = 0
for y in range(h):
    if row_bg[y] and not ins: st = y; ins = True
    elif not row_bg[y] and ins: seps.append((st, y-1)); ins = False
if ins: seps.append((st, h-1))

content_rows = []
for i in range(len(seps)-1):
    rs, re = seps[i][1]+1, seps[i+1][0]-1
    if re > rs: content_rows.append((rs, re))

px = img.load()
def is_p(p): return p[0] > 180 and p[1] < 50 and p[2] > 180

all_sprites = []
for ri, (rs, re) in enumerate(content_rows):
    step = max(1, (re-rs)//6)
    cseps = []; ins = False
    for x in range(w):
        cp = all(is_p(px[x,y]) for y in range(rs, re+1, step))
        if cp and not ins: st = x; ins = True
        elif not cp and ins: cseps.append((st, x-1)); ins = False
    if ins: cseps.append((st, w-1))
    cells = []
    if cseps and cseps[0][0] > 3: cells.append((0, cseps[0][0]-1))
    for i in range(len(cseps)-1):
        cs, ce = cseps[i][1]+1, cseps[i+1][0]-1
        if ce-cs > 10: cells.append((cs, ce))
    for cs, ce in cells:
        region = a[rs:re+1, cs:ce+1]
        nbg = ~is_magenta_bg(region)
        ys2, xs2 = np.where(nbg)
        if len(ys2) < 30: continue
        my, My, mx, Mx = int(ys2.min()), int(ys2.max()), int(xs2.min()), int(xs2.max())
        if (Mx-mx) > 15 and (My-my) > 15:
            # Add 4px padding to bbox so beak tips aren't clipped
            pad = 4
            bx0 = max(0, cs + mx - pad)
            by0 = max(0, rs + my - pad)
            bx1 = min(w, cs + Mx + 1 + pad)
            by1 = min(h, rs + My + 1 + pad)
            all_sprites.append((ri, (bx0, by0, bx1, by1)))

rows_data = []
for ri in range(len(content_rows)):
    rs = sorted([s for s in all_sprites if s[0] == ri], key=lambda s: s[1][0])
    rows_data.append(rs)

COLS = max(len(r) for r in rows_data)
ROWS = len(rows_data)
max_w = max(s[1][2]-s[1][0] for s in all_sprites)
max_h = max(s[1][3]-s[1][1] for s in all_sprites)
CELL = ((max(max_w, max_h) + 20 + 7) // 8) * 8
print(f"Grid: {COLS}x{ROWS}, Cell: {CELL}, Sprites: {len(all_sprites)}")

# === BUILD OUTPUT ===
print("Building clean sprite sheet...")
out = Image.new("RGBA", (COLS*CELL, ROWS*CELL), (0, 0, 0, 0))
manifest = {"cols": COLS, "rows": ROWS, "cell": CELL, "animations": {}}
ROW_NAMES = ["idle","walk","run","honk","carry","drag","reactions","effects"]

for ri, row_sprites in enumerate(rows_data):
    name = ROW_NAMES[ri] if ri < len(ROW_NAMES) else f"row{ri}"
    frame_indices = []
    for ci, (_, bbox) in enumerate(row_sprites):
        if ci >= COLS: break
        sprite_arr = np.array(img.crop(bbox), dtype=np.int16)
        cleaned = kill_bg(sprite_arr)
        simg = Image.fromarray(cleaned.astype(np.uint8))
        ca = np.array(simg)[:,:,3]
        ys, xs = np.where(ca > 0)
        if len(ys) == 0: continue
        tight = simg.crop((int(xs.min()), int(ys.min()), int(xs.max())+1, int(ys.max())+1))
        tw, th = tight.size
        ox = (CELL - tw) // 2
        oy = CELL - th - 4
        out.paste(tight, (ci*CELL+ox, ri*CELL+oy), tight)
        frame_indices.append(ri * COLS + ci)
    manifest["animations"][name] = frame_indices
    print(f"  {name}: {len(frame_indices)} frames")

out.save(OUT + ".png", "PNG")
out.save(OUT + ".webp", "WEBP", quality=95)
with open(OUT + ".json", "w") as f:
    json.dump(manifest, f, indent=2)

# Quick verify and final purple nuke
fa = np.array(out, dtype=np.int16)
fr,fg,fb,fal = fa[:,:,0],fa[:,:,1],fa[:,:,2],fa[:,:,3]

# Kill dark purple outline: R and B close, G very low, NOT orange (orange has R >> B)
dark_outline = (fal>0) & (fr>40) & (fb>40) & (fg<50) & (np.abs(fr-fb)<60)
# Kill medium purple: R>100, B>80, G<70
med_purple = (fal>0) & (fr>100) & (fb>80) & (fg<70) & (np.abs(fr-fb)<60)
# Protect orange: R much bigger than B  
orange_safe = (fr > fb + 40)
kill = (dark_outline | med_purple) & ~orange_safe
fa[kill, 3] = 0

# One edge erosion pass to clean up any new fringe
sh2, sw2 = fa.shape[:2]
pad2 = np.pad(fa[:,:,3], 1, constant_values=0)
tn2 = sum(
    (pad2[1+dy:1+dy+sh2, 1+dx:1+dx+sw2]==0).astype(np.int16)
    for dy in [-1,0,1] for dx in [-1,0,1] if not (dy==0 and dx==0)
)
lonely = (fa[:,:,3]>0) & (tn2>=6)  # mostly surrounded by transparent
fa[lonely, 3] = 0

out = Image.fromarray(fa.astype(np.uint8))

# Final count
remaining = (fa[:,:,3]>0) & (fa[:,:,0]>40) & (fa[:,:,2]>40) & (fa[:,:,1]<50) & (np.abs(fa[:,:,0]-fa[:,:,2])<60) & ~(fa[:,:,0] > fa[:,:,2] + 40)
print(f"\nPurple remaining: {int(np.sum(remaining))}")
print(f"Saved: {OUT}.webp ({COLS*CELL}x{ROWS*CELL})")
