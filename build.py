#!/usr/bin/env python3
"""
build.py — билди сайти бисёрзабона (tg / ru / en)

1. Фрагментҳои i18n-source/*.json (формат: {key: {tg, ru, en}}) -> як луғати умумӣ
2. src/locales/tg.json, ru.json, en.json  (flat, калидҳои ЯКХЕЛА)
3. src/locales/bundles.js (fallback барои кушодан аз file://)
4. dist/tg, dist/ru, dist/en — нусхаи пурраи сайт барои ҳар забон
   + dist/index.html (redirect аз рӯи забони браузер)
   + _redirects / vercel.json / .htaccess (clean URL: /ru/search)
5. Тафтиш: калидҳои гумшуда/истифоданашуда, паритети калидҳо
"""
import json, os, re, shutil, sys
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "src"
SOURCE = ROOT / "i18n-source"
DIST = ROOT / "dist"
LOCALES = ["tg", "ru", "en"]
DEFAULT = "tg"

# ---------------------------------------------------------------- 1. merge
def merge_fragments():
    files = sorted(SOURCE.glob("*.json"), key=lambda p: (not p.name.startswith("core"), p.name))
    merged, origin, conflicts = {}, {}, []
    for f in files:
        data = json.loads(f.read_text(encoding="utf-8"))
        for key, vals in data.items():
            if not isinstance(vals, dict):
                raise SystemExit(f"[{f.name}] калиди '{key}': бояд объект бо tg/ru/en бошад")
            missing = [lc for lc in LOCALES if not str(vals.get(lc, "")).strip()]
            if missing:
                raise SystemExit(f"[{f.name}] калиди '{key}': тарҷума нест барои {missing}")
            if key in merged:
                if merged[key] != vals:
                    conflicts.append((key, origin[key], f.name))
                continue
            merged[key] = {lc: vals[lc] for lc in LOCALES}
            origin[key] = f.name
    return merged, conflicts

# ------------------------------------------------- 2. калидҳои истифодашуда
KEY_PATTERNS = [
    re.compile(r"""\bt\(\s*['"]([\w.\-+#]+)['"]"""),                 # t("key")
    re.compile(r"""data-i18n\s*=\s*['"]([\w.\-+#]+)['"]"""),
    re.compile(r"""data-i18n-html\s*=\s*['"]([\w.\-+#]+)['"]"""),
    re.compile(r"""data-i18n-attr\s*=\s*['"]([^'"]+)['"]"""),        # attr:key;attr:key
    re.compile(r"""\bnameKey\s*:\s*['"]([\w.\-+#]+)['"]"""),
    re.compile(r"""\blabelKey\s*:\s*['"]([\w.\-+#]+)['"]"""),
    re.compile(r"""\b(?:titleKey|descKey|textKey|timeKey|locationKey)\s*:\s*['"]([\w.\-+#]+)['"]"""),
    re.compile(r"""\bBK\(\s*['"]([\w.\-+#]+)['"]\s*\)"""),
    re.compile(r"""\bshowToast\(\s*['"]([\w.\-+#]+)['"]"""),
    re.compile(r"""\?\s*['"]([\w]+\.[\w.\-+#]+)['"]\s*:\s*['"][\w]+\.[\w.\-+#]+['"]"""),
]
DYNAMIC_PREFIXES = ("opt.", "cond.", "city.", "loc.", "currency.", "date.month.",
                    "date.weekday.", "lang.", "brand.", "type.", "cat.", "attr.")
# Калидҳое, ки дар коди ядро ҳамчун тағйирпазир меоянд (t(key)) — на калиди воқеӣ
IGNORE_KEYS = {"key"}

def collect_used_keys():
    used = {}
    for f in list(SRC.glob("*.html")) + list(SRC.glob("*.js")):
        text = f.read_text(encoding="utf-8")
        for pat in KEY_PATTERNS:
            for m in pat.finditer(text):
                raw = m.group(1)
                items = []
                if ":" in raw and ";" in raw or (":" in raw and "." in raw.split(":")[-1]):
                    for pair in raw.split(";"):
                        if ":" in pair:
                            items.append(pair.split(":", 1)[1].strip())
                else:
                    items.append(raw)
                for k in items:
                    if k and not k.startswith("'"):
                        used.setdefault(k, set()).add(f.name)
    return used

# ------------------------------------------------------------- 3. навиштан
def write_locales(merged):
    out = SRC / "locales"
    out.mkdir(parents=True, exist_ok=True)
    bundles = {}
    for lc in LOCALES:
        flat = {k: v[lc] for k, v in sorted(merged.items())}
        (out / f"{lc}.json").write_text(
            json.dumps(flat, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        bundles[lc] = flat
    (out / "bundles.js").write_text(
        "/* Auto-generated. Fallback барои кушодани сайт аз file:// */\n"
        "window.__I18N_BUNDLES__ = " + json.dumps(bundles, ensure_ascii=False) + ";\n",
        encoding="utf-8")
    return out

PAGES = None
def build_dist():
    global PAGES
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir(parents=True)
    PAGES = sorted(p.name for p in SRC.glob("*.html"))
    for lc in LOCALES:
        target = DIST / lc
        shutil.copytree(SRC, target, ignore=shutil.ignore_patterns("fragments"))
        # <html lang> — то ҳатто бе JS дуруст бошад (SEO)
        for page in target.glob("*.html"):
            html = page.read_text(encoding="utf-8")
            html = re.sub(r'<html\s+lang="[^"]*"', f'<html lang="{lc}"', html, count=1)
            page.write_text(html, encoding="utf-8")
        # clean URL: /ru/search  →  /ru/search/index.html
        for page in list(target.glob("*.html")):
            if page.name == "index.html":
                continue
            d = target / page.stem
            d.mkdir(exist_ok=True)
            shutil.copy2(page, d / "index.html")
    # Роҳи асосӣ: муайян кардани забон ва redirect
    (DIST / "index.html").write_text(ROOT_REDIRECT, encoding="utf-8")
    (DIST / "robots.txt").write_text(ROBOTS, encoding="utf-8")
    (DIST / "sitemap.xml").write_text(sitemap(), encoding="utf-8")
    (DIST / "_redirects").write_text(NETLIFY_REDIRECTS, encoding="utf-8")
    (DIST / "vercel.json").write_text(VERCEL_JSON, encoding="utf-8")
    (DIST / ".htaccess").write_text(HTACCESS, encoding="utf-8")

ROOT_REDIRECT = """<!DOCTYPE html>
<html lang="tg">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex">
<title>elon.tj</title>
<link rel="alternate" hreflang="tg" href="./tg/">
<link rel="alternate" hreflang="ru" href="./ru/">
<link rel="alternate" hreflang="en" href="./en/">
<link rel="alternate" hreflang="x-default" href="./tg/">
</head>
<body>
<script>
/* Забонро муайян мекунем: интихоби қаблӣ → браузер → tg */
(function(){
  var L = ['tg','ru','en'], d = 'tg', lc = null;
  try { lc = localStorage.getItem('NEXT_LOCALE'); } catch(e){}
  if (!lc) {
    var m = document.cookie.match(/(?:^|;)\\s*NEXT_LOCALE\\s*=\\s*([^;]+)/);
    if (m) lc = decodeURIComponent(m[1]);
  }
  if (L.indexOf(lc) === -1) {
    var langs = navigator.languages || [navigator.language || ''];
    lc = null;
    for (var i = 0; i < langs.length && !lc; i++) {
      var c = String(langs[i]).toLowerCase().split('-')[0];
      if (c === 'ru') lc = 'ru';
      else if (c === 'en') lc = 'en';
      else if (c === 'tg' || c === 'tj') lc = 'tg';
    }
    lc = lc || d;
  }
  location.replace('./' + lc + '/index.html' + location.search);
})();
</script>
<noscript><a href="./tg/index.html">elon.tj</a></noscript>
</body>
</html>
"""

ROBOTS = "User-agent: *\nAllow: /\nSitemap: /sitemap.xml\n"

NETLIFY_REDIRECTS = """# Забони асосӣ ва clean URL
/            /tg/index.html   200
/:lc/:page   /:lc/:page.html  200
"""

VERCEL_JSON = json.dumps({
    "cleanUrls": True,
    "trailingSlash": False,
    "redirects": [{"source": "/", "destination": "/tg/index.html", "permanent": False}],
}, indent=2) + "\n"

HTACCESS = """RewriteEngine On
# /ru/search  →  /ru/search.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(tg|ru|en)/([a-z-]+)$ $1/$2.html [L]
"""

def sitemap():
    urls = []
    for lc in LOCALES:
        for page in PAGES:
            loc = f"/{lc}/{page}"
            alts = "".join(
                f'\n    <xhtml:link rel="alternate" hreflang="{a}" href="/{a}/{page}"/>'
                for a in LOCALES)
            alts += f'\n    <xhtml:link rel="alternate" hreflang="x-default" href="/{DEFAULT}/{page}"/>'
            urls.append(f"  <url>\n    <loc>{loc}</loc>{alts}\n  </url>")
    return ('<?xml version="1.0" encoding="UTF-8"?>\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
            '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
            + "\n".join(urls) + "\n</urlset>\n")

# ------------------------------------------------------------------ main
def main():
    merged, conflicts = merge_fragments()
    used = collect_used_keys()
    missing = {k: sorted(v) for k, v in used.items()
               if k not in merged and k not in IGNORE_KEYS
               and not k.startswith(DYNAMIC_PREFIXES)}
    unused = [k for k in merged
              if k not in used and '#' not in k and not k.startswith(DYNAMIC_PREFIXES)
              and not k.startswith(("cat.", "type.", "attr.", "demo.", "common.", "err.", "ph."))]

    write_locales(merged)
    build_dist()

    print(f"✓ калидҳо: {len(merged)}  × {len(LOCALES)} забон")
    print(f"✓ dist/: {', '.join(LOCALES)} ({len(PAGES)} саҳифа дар ҳар забон)")
    if conflicts:
        print(f"\n⚠ дубликат бо маънои гуногун ({len(conflicts)}):")
        for k, a, b in conflicts[:20]:
            print(f"   {k}: {a} vs {b} (аввалин истифода шуд)")
    if missing:
        print(f"\n✗ КАЛИДҲОИ ГУМШУДА ({len(missing)}):")
        for k, files in sorted(missing.items())[:60]:
            print(f"   {k}  ← {', '.join(files)}")
    else:
        print("✓ ҳамаи калидҳои истифодашуда тарҷума доранд")
    if unused:
        print(f"\n· калидҳои истифоданашуда ({len(unused)}): {', '.join(sorted(unused)[:25])}")
    return 1 if missing else 0

if __name__ == "__main__":
    sys.exit(main())
