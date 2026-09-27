# elon.tj — сайти бисёрзабона (🇹🇯 tg · 🇷🇺 ru · 🇬🇧 en)

Забони асосӣ: **тоҷикӣ (tg)**. Дар код ҳеҷ матни кушод (hardcoded) нест — ҳама чиз
аз `locales/tg.json`, `locales/ru.json`, `locales/en.json` (**711 калид × 3 забон**,
калидҳо комилан якхела) гирифта мешавад. Google Translate истифода нашудааст —
ҳамаи тарҷумаҳо дастӣ навишта шудаанд.

## Сохти папкаҳо

```
src/                     ← коди корӣ (ин ҷо таҳрир кунед)
  i18n.js                ← ядрои система (t, setLocale, switcher, hreflang)
  category-engine.js     ← категорияҳо: nameKey / labelKey / кодҳо
  data.js                ← эълонҳои намунавӣ: titleKey / descKey
  storage.js, layout.js  ← header, footer, меню, карточкаҳо — ҳама аз t()
  *.html                 ← 10 саҳифа
  locales/{tg,ru,en}.json  ← АВТОМАТӢ сохта мешавад (build.py)
i18n-source/*.json       ← манбаи тарҷума: {"key": {"tg":"…","ru":"…","en":"…"}}
build.py                 ← merge + тафтиш + сохтани dist/
qa.js                    ← тести автоматӣ (10 саҳифа × 3 забон)
dist/                    ← натиҷаи омода: /tg /ru /en + sitemap, robots, redirect
I18N-CONTRACT.md         ← қоидаҳои ҳатмии код
```

## Билд

```bash
python3 build.py     # → src/locales/*.json + dist/{tg,ru,en}
node qa.js           # тест: калиди гумшуда, хатои JS, забони <html>, switcher
```

`build.py` худаш тафтиш мекунад:
- ҳар калид дар ҳар се забон **бояд** тарҷума дошта бошад, вагарна билд қатъ мешавад;
- ҳамаи калидҳои дар код истифодашуда бояд дар луғат бошанд (`✗ КАЛИДҲОИ ГУМШУДА`);
- калидҳои такрорӣ бо маънои гуногун огоҳӣ медиҳанд.

## Чӣ гуна кор мекунад

**1. Муайян кардани забон** (`i18n.js → detectLocale`), бо ҳамин тартиб:
`/ru/...` дар URL → `localStorage.NEXT_LOCALE` ё cookie `NEXT_LOCALE` →
забони браузер (`ru` / `en`) → **tg**.

**2. Иваз кардани забон — БЕ reload.** `setLocale(lc)`:
JSON-и нав бор мешавад → `localStorage` + cookie `NEXT_LOCALE` сабт мешавад →
`history.pushState` URL-ро ба `/ru/search.html?...` иваз мекунад →
`I18N.apply()` ҳамаи матни статикӣ ва ҳар `I18N.onChange(...)` блокҳои
динамикиро аз нав месозад. Ҳолати корбар (филтрҳо, матни воридшуда, чати кушода,
сурати галерея) гум намешавад.

**3. Дар HTML**

```html
<h1 data-i18n="home.title"></h1>
<input data-i18n-attr="placeholder:ph.search;title:common.find">
<p data-i18n-html="footer.rights"></p>
<span data-i18n="search.found" data-i18n-args='{"n":20}'></span>
<div data-lang-switcher></div>   <!-- [ 🇹🇯 TJ | 🇷🇺 RU | 🇬🇧 EN ] -->
```

**4. Дар JS:** `t('key')`, `t('key', {n: 5})`, `tv('opt.fuel', 'petrol')`,
`formatPrice`, `formatDate`, `formatNumber`, `I18N.onChange(renderPage)`.

**5. SEO:** ҳар саҳифа `<html lang="tg|ru|en">` (ҳам дар билд, ҳам динамикӣ),
`<link rel="alternate" hreflang="tg|ru|en|x-default">`, `<link rel="canonical">`,
`title` + `meta description` + `og:*` ҳама аз калидҳо, `dist/sitemap.xml`
бо ҳамаи 30 URL ва alternate-ҳо.

## URL-ҳо

| Роҳ | Натиҷа |
|---|---|
| `/` | забонро муайян мекунад ва redirect мекунад |
| `/tg/index.html`, `/ru/search.html`, `/en/listing.html?id=1` | саҳифаҳои асосӣ |
| `/ru/search` (бе `.html`) | тавассути `_redirects` / `vercel.json` / `.htaccess` ё папкаи alias |

Ҳар папкаи забон нусхаи мустақил аст, аз ин рӯ ҳамаи линкҳои нисбӣ
(`listing.html?id=1`) худ аз худ дар дохили ҳамон забон мемонанд.

## Илова кардани матни нав

1. Калидро дар яке аз файлҳои `i18n-source/*.json` бо ҳар се тарҷума нависед.
2. Дар HTML `data-i18n="..."` ё дар JS `t("...")` истифода баред.
3. `python3 build.py && node qa.js`.

## Илова кардани забони чорум (мисол: `uz`)

1. Дар `i18n.js`: ба `LOCALES` ва `META` (flag, short, htmlLang) илова кунед.
2. Дар `build.py`: `LOCALES = ["tg","ru","en","uz"]`.
3. Дар ҳар фрагменти `i18n-source/` калиди `"uz"` илова кунед (build худаш
   набуданашро нишон медиҳад) + `lang.uz`.

---

## Иконкаҳо (SVG)

Ҳамаи emoji-ҳо бо иконкаҳои хатии SVG иваз шудаанд — файли `icons.js`
(маҷмӯаи **Lucide**, литсензияи ISC, 69 иконка, `stroke="currentColor"`).

**Истифода дар HTML:**

```html
<span class="ico" data-icon="heart"></span>
```

`icons.js` ҳамаи `[data-icon]`-ро худкор пур мекунад ва тавассути `MutationObserver`
контенти динамикӣ (карточкаҳо, чатҳо) низ пур мешавад.

**Истифода дар JavaScript (template):**

```js
`<div class="cat-icon">${iconHTML(catIcons[c.slug] || 'wrench')}</div>`
iconHTML('heart-fill')   // варианти пуркарда (дилчаи сурх)
```

**Андоза** аз `font-size`-и волид меояд (`svg{width:1em;height:1em}`), ранг — аз `color`.
Классҳои иловагӣ дар `style.css`: `.ico-lg`, `.ico-ph` (дар ҷои сурат), `.ico-hero`.

Иконкаҳои категорияҳо дар `category-engine.js` бо ном сабтанд (`icon: 'car'`),
на бо emoji. Барои категорияи нав танҳо номи иконкаи Lucide-ро гузоред; агар
он дар `icons.js` набошад, номро ба рӯйхати `names` дар скрипти билд илова кунед.

## Нигоҳдории забон ҳангоми гузариш

`i18n.js` ду механизм дорад:

1. `history.pushState` — URL-ро бе reload иваз мекунад (`/tg/…` → `/ru/…`).
2. **Nav guard** — `retargetLinks()` + click/submit interceptor: ҳар линки дохилӣ ва
   ҳар форма ба папкаи забони ҷорӣ равона мешавад. Ин кор мекунад ҳатто дар
   `file://`, ки дар он `pushState` манъ аст (ва он ҷо интихоби корбар аз URL болотар аст).

## Шаклҳои ҷамъ (plural)

Калидҳои иловагӣ: `key#one`, `key#few`, `key#many`, `key#other` (тавассути `Intl.PluralRules`).
Мисол: `search.found` (асосӣ = «объявлений»), `search.found#one` = «объявление»,
`search.found#few` = «объявления». Дар код тағйирот лозим нест — ҳамон `t('search.found', {n})`.
