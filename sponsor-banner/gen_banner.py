#!/usr/bin/env python3
"""Generate the Century Panther Touchdown Club corporate-sponsors vinyl banner.

Self-contained HTML (logos embedded as base64) sized to the physical banner.
Chrome headless renders it to a vector PDF: text/shapes stay vector, logos
embed as high-res raster.
"""
import base64
import mimetypes
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
OUT = pathlib.Path(__file__).parent / "sponsor-banner.html"

W_IN = 120   # 10 ft wide
H_IN = 48    # 4 ft tall


def data_uri(relpath: str) -> str:
    p = pathlib.Path(relpath) if relpath.startswith("/") else (PUB / relpath)
    mime, _ = mimetypes.guess_type(str(p))
    if p.suffix.lower() == ".svg":
        mime = "image/svg+xml"
    return f"data:{mime};base64," + base64.b64encode(p.read_bytes()).decode()


def S(src, name, dark=False):
    return {"src": src, "name": name, "dark": dark, "text": None}


def T(text):
    """A set-type tile: business name typeset in the banner's own type (no logo art)."""
    return {"src": None, "name": text, "dark": False, "text": text}


# metal accent colors for tier labels
M = {"plat": "#e3e7ee", "gold": "#e7b62c", "silver": "#b9c0cc",
     "bronze": "#c67f43", "iron": "#8b929c", "game": "#c3c9d3"}

# A "band" is a horizontal strip holding one or more labelled groups.
# Each group: label + a row of logo tiles. `flex` weights group widths.
BANDS = [
    {"h": 8.8, "groups": [
        {"label": "Platinum", "metal": M["plat"], "flex": 1, "center": True,
         "tile_max_w": 40,
         "sponsors": [S("sponsors/hyvee.png", "Hy-Vee")]},
    ]},
    {"h": 8.3, "groups": [
        {"label": "Gold", "metal": M["gold"], "flex": 1, "center": True, "tile_max_w": 27,
         "sponsors": [S("sponsors/LakesideDental.png", "Lakeside Dentistry")]},
        {"label": "Silver", "metal": M["silver"], "flex": 1, "center": True, "tile_max_w": 27,
         "sponsors": [S("sponsors/VFW-1215.png", "VFW Post 1215"),
                      S("sponsors/TKLOGO.svg", "Tom Kadlec")]},
    ]},
    {"h": 7.0, "groups": [
        {"label": "Bronze", "metal": M["bronze"], "flex": 1,
         "sponsors": [
             S("sponsors/alerus-logo.svg", "Alerus"),
             S("sponsors/Atlas.png", "Atlas Insurance"),
             S("sponsors/ArchKey_Solutions.jpg", "ArchKey Technologies"),
             T("Bear Arms, LLC"),
             S("sponsors/Bowlocity.png", "Bowlocity"),
             S("sponsors/counselor-realty-homepage-logo.svg", "Counselor Realty"),
             S("sponsors/MC_STACKED_BLACK_RGB_CLEAR.png", "Mayo Clinic"),
             S("sponsors/summit.png", "Summit Fire Protection"),
         ]},
    ]},
    {"h": 6.6, "groups": [
        {"label": "Iron", "metal": M["iron"], "flex": 2,
         "sponsors": [
             S(str(pathlib.Path(__file__).parent / "edi-logo.png"), "EDI Driving School"),
             S("sponsors/superior-screeners.svg", "Superior Screeners"),
         ]},
        {"label": "Game Day Partners", "metal": M["game"], "flex": 3,
         "sponsors": [
             S("sponsors/chick-fil-a.png", "Chick-fil-A"),
             S("sponsors/WestEndBlends.jpg", "West End Blends"),
             S("sponsors/Tavern 22.jpg", "Tavern 22"),
         ]},
    ]},
]

PANTHER = data_uri("panther-logo.png")
QR_SITE = data_uri(str(pathlib.Path(__file__).parent / "qr-site.svg"))


def group_html(g: dict, band_h: float) -> str:
    row_justify = "center" if g.get("center") else "space-between"
    tiles = []
    for s in g["sponsors"]:
        mw = f'max-width:{g["tile_max_w"]}in;' if g.get("tile_max_w") else ""
        if s["text"]:
            fs = round(band_h * 0.21, 2)
            inner = f'<span class="wordmark" style="font-size:{fs}in">{s["text"]}</span>'
            cls = "tile tile-text"
        else:
            inner = f'<img src="{data_uri(s["src"])}" alt="{s["name"]}">'
            cls = "tile dark" if s["dark"] else "tile"
        tiles.append(f'<div class="{cls}" style="height:{band_h}in;{mw}">{inner}</div>')
    return (
        f'<div class="group" style="flex:{g["flex"]}">'
        f'<div class="tier-label"><span class="bar" style="background:{g["metal"]}"></span>'
        f'<span class="txt">{g["label"]}</span></div>'
        f'<div class="row" style="justify-content:{row_justify}">{"".join(tiles)}</div>'
        f'</div>'
    )


def band_html(b: dict) -> str:
    groups = "".join(group_html(g, b["h"]) for g in b["groups"])
    return f'<div class="band">{groups}</div>'


bands_markup = "\n".join(band_html(b) for b in BANDS)

HTML = f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<style>
:root{{
  --navy:#0b1f3a; --navy-deep:#081527; --navy-soft:#16304f;
  --silver:#c3c9d3; --silver-bright:#e2e6ec; --muted:#9fb0c8;
}}
@page {{ size: {W_IN}in {H_IN}in; margin: 0; }}
* {{ box-sizing: border-box; }}
html,body {{ margin:0; padding:0; -webkit-print-color-adjust:exact; print-color-adjust:exact;
  font-family: system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif; }}
.banner {{ width:{W_IN}in; height:{H_IN}in; display:flex; overflow:hidden; color:#fff;
  background: radial-gradient(120% 150% at 12% 0%, #12325a 0%, var(--navy) 45%, var(--navy-deep) 100%); }}

/* left brand panel */
.brand {{ flex:0 0 30in; display:flex; flex-direction:column; align-items:center;
  text-align:center; padding:2.6in 2.2in 2.2in;
  border-right:.14in solid rgba(195,201,211,.30); background:rgba(4,10,20,.32); }}
.brand-main {{ flex:1; display:flex; flex-direction:column; align-items:center;
  justify-content:center; }}
.brand .logo {{ width:10.5in; height:10.5in; object-fit:contain;
  filter: drop-shadow(0 .25in .5in rgba(0,0,0,.5)); }}
.brand .kicker {{ margin-top:1.3in; color:var(--silver); font-weight:800;
  letter-spacing:.16em; text-transform:uppercase; font-size:1.15in; }}
.brand h1 {{ margin:.5in 0 0; font-weight:800; text-transform:uppercase;
  letter-spacing:.02em; line-height:.92; }}
.brand h1 .big {{ display:block; font-size:4.2in; color:#fff; }}
.brand h1 .sub {{ display:block; font-size:2.05in; color:var(--silver-bright); margin-top:.28in; }}
.brand .foot {{ margin-top:1in; color:var(--muted); font-size:1.1in; font-weight:600; }}
.brand-qr {{ display:flex; justify-content:center; margin-top:1.5in; }}
.qr-card {{ background:#fff; border-radius:.8in; padding:1.1in 1.3in 1in;
  display:flex; flex-direction:column; align-items:center; gap:.75in;
  box-shadow:0 .16in .55in rgba(0,0,0,.42); }}
.qr-card img {{ width:11in; height:11in; display:block; }}
.qr-caption {{ color:var(--navy); font-weight:800; letter-spacing:.005em;
  font-size:.85in; line-height:1; text-align:center; white-space:nowrap; }}
.qr-caption .lead {{ font-weight:600; }}

/* right content */
.content {{ flex:1; display:flex; flex-direction:column; justify-content:center;
  gap:1.5in; padding:2.6in 3.4in; }}
.band {{ display:flex; gap:3in; align-items:flex-start; }}
.group {{ display:flex; flex-direction:column; }}
.tier-label {{ display:flex; align-items:center; gap:.45in; margin-bottom:.4in; }}
.tier-label .bar {{ width:1.5in; height:.3in; border-radius:.15in; flex:0 0 auto;
  box-shadow:0 0 .22in rgba(255,255,255,.15); }}
.tier-label .txt {{ font-weight:800; letter-spacing:.15em; text-transform:uppercase;
  color:var(--silver-bright); font-size:1.15in; }}
.row {{ display:flex; align-items:stretch; gap:.9in; }}
.tile {{ flex:1 1 0; background:#fff; border-radius:.6in; display:flex; align-items:center;
  justify-content:center; padding:.8in 1.1in; box-shadow:0 .12in .4in rgba(0,0,0,.38); }}
.tile img {{ width:100%; height:100%; object-fit:contain; display:block; }}
.tile.dark {{ background:var(--navy-soft); border:.05in solid rgba(195,201,211,.45); }}
.tile.dark img {{ mix-blend-mode:screen; }}
.tile-text .wordmark {{ color:var(--navy); font-weight:800; text-transform:uppercase;
  letter-spacing:.02em; line-height:1.02; text-align:center; }}
</style></head>
<body>
  <div class="banner">
    <div class="brand">
      <div class="brand-main">
        <img class="logo" src="{PANTHER}" alt="Century Panther Touchdown Club">
        <div class="kicker">Century Panther Football</div>
        <h1><span class="big">Thank You</span><span class="sub">To Our 2026 Sponsors</span></h1>
        <div class="foot">Proud partners of Panther football</div>
      </div>
      <div class="brand-qr">
        <div class="qr-card">
          <img src="{QR_SITE}" alt="Scan to visit CenturyPantherFootball.com">
          <div class="qr-caption"><span class="lead">Visit</span> CenturyPantherFootball.com</div>
        </div>
      </div>
    </div>
    <div class="content">
      {bands_markup}
    </div>
  </div>
</body></html>"""

OUT.write_text(HTML)
print("wrote", OUT, f"({len(HTML)/1_000_000:.2f} MB)")
