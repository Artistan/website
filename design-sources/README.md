# design-sources

Source artwork for logos and print pieces. **Not served** — this directory sits
outside `public/`, so nothing here is deployed to the site.

Keep original/high-resolution art here when the web-facing asset is a derived
export. The export itself goes in `public/`.

## sponsors/

Source art for the VFW Post 1215 logo:

| File | What it is |
| --- | --- |
| `CrossOfMalta_vector.png` | The Cross of Malta emblem, 1248&times;1249 |
| `VFW-Red-Logo-on-White_Open-Graph.png` | Reference lockup for the wordmark |

Both are already embedded as base64 inside
`public/sponsors/vfw-1215.svg`, so that file opens standalone in Inkscape with
no missing links. They're kept here as the unflattened originals.

The pipeline is: these &rarr; `public/sponsors/vfw-1215.svg` (Inkscape working
file) &rarr; `public/sponsors/VFW-1215.png` (export used by the sponsor card and
by `sponsor-banner/gen_banner.py`).

Note the PNG export is sized for the 120in &times; 48in vinyl banner, not for the
web card — don't downscale it to save page weight without giving the banner its
own copy first.
