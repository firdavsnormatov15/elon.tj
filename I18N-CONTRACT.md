# elon.tj — i18n contract (ҳатмӣ барои ҳамаи саҳифаҳо)

Забонҳо: `tg` (асосӣ/fallback), `ru`, `en`.
Файлҳои тарҷума: `src/locales/tg.json`, `ru.json`, `en.json` (flat, калидҳои якхела).
Ядро: `src/i18n.js` (аллакай нависта шудааст — ТАҒЙИР НАДИҲЕД).

## 1. API-и дастрас (глобалӣ)

```js
t("key")                        // матн
t("key", { n: 5, name: "X" })   // бо тағйирпазир: "{{n}}", "{{name}}"
I18N.locale                     // "tg" | "ru" | "en"
I18N.setLocale("ru")            // иваз кардани забон (бе reload)
I18N.onChange(fn)               // callback баъди иваз шудани забон → re-render
I18N.apply(rootEl)              // тарҷумаи блоки нави DOM (data-i18n дар дохилаш)
I18N.num(1234)                  // 1 234 (аз рӯи забон)
I18N.price(185000, "somoni")    // нарх (0 → "Тавофуқӣ"/"Договорная"/"Negotiable")
I18N.relTime(iso)               // "2 рӯз пеш" / "2 дня назад" / "2 days ago"
I18N.has("key")                 // калид ҳаст ё не
```

Helper-ҳои маълумот (аз `data.js` / `category-engine.js` / `storage.js`):

```js
listingTitle(l) listingDesc(l) listingLocation(l) listingCondition(l) listingSubcategory(l)
userName(u) condLabel(code) cityLabel(code) formatPrice(p,cur) formatDate(iso) formatNumber(n)
getCategoryName(slug) getSubcategories(slug) cityOptions() conditionOptions()
brandName(brandObj) brandId(brandObj) brandLabel(brandIdent) attrLabel(attr) optLabel(attrKey, code)
convName(c) msgText(m) msgTime(m) convTime(c)
```

## 2. Дар HTML

```html
<title data-i18n="meta.index.title"></title>
<meta name="description" data-i18n-attr="content:meta.index.desc">
<meta property="og:title" data-i18n-attr="content:meta.index.ogTitle">
<h2 data-i18n="home.latest"></h2>
<span data-i18n="home.total" data-i18n-args='{"n":1200}'></span>   <!-- {{n}} -->
<p data-i18n-html="footer.about"></p>                              <!-- HTML дохилӣ -->
<input data-i18n-attr="placeholder:ph.search;aria-label:ph.search">
<button data-i18n="common.send" data-i18n-attr="title:common.send"></button>
```

**Матни кушод дар HTML/JS МУТЛАҚО МАНЪ АСТ** — ҳатто `title`, `aria-label`, `alt`,
`placeholder`, `<option>`, матни хатоҳои валидатсия ва `<title>`/`<meta>`.
Танҳо иҷозат дода мешавад: рақамҳо, emoji/иконҳо, номҳои хос (elon.tj, Toyota, iPhone),
рақами телефон, e-mail.

## 3. Switcher (дар ҲАР саҳифа)

Дар header (дохили `.nav-btns`, пеш аз тугмаи «+ Эълон»):
```html
<div data-lang-switcher></div>
```
Ва дар менюи мобилӣ (`.mobile-menu`, пеш аз рӯйхати меню):
```html
<div data-lang-switcher></div>
```
`i18n.js` худаш онҳоро пур мекунад ([🇹🇯 TJ | 🇷🇺 RU | 🇬🇧 EN]) ва рӯйдодҳоро мебандад.

## 4. Тартиби скриптҳо (дар ҳар саҳифа, дар охири `<body>`)

```html
<script src="i18n.js"></script>
<script src="category-engine.js"></script>
<script src="data.js"></script>
<script src="storage.js"></script>
<script src="layout.js"></script>
<script> /* коди саҳифа */ </script>
```
`i18n.js` ҲАМЕША аввал. Дар `<head>` ҳам мемонад — не, танҳо як маротиба дар охир.

## 5. Re-render ҳангоми иваз шудани забон

Ҳар саҳифа бояд функсияи render-и худро дошта бошад ва онро сабт кунад:

```js
function renderPage(){ /* тамоми контенти динамикӣ */ }
document.addEventListener('DOMContentLoaded', renderPage);
I18N.onChange(renderPage);   // БЕ reload — фавран тарҷума
```
Ҳолати корбар (филтрҳо, матни ҷустуҷӯ, чати кушода) бояд нигоҳ дошта шавад.

## 6. Тағйироти сохти маълумот (МУҲИМ — коди кӯҳна вайрон мешавад)

| Кӯҳна | Нав |
|---|---|
| `l.title` | `listingTitle(l)` (намуна: `titleKey`) |
| `l.description` | `listingDesc(l)` |
| `l.location` | `listingLocation(l)` |
| `l.condition` (матн) | код (`new`/`used`/`good`) → `listingCondition(l)` / `condLabel(code)` |
| `l.subcategory` | `listingSubcategory(l)` |
| `l.author.name` | `userName(l.author)` |
| `l.currency` = `'сомонӣ'` | код `'somoni'` → `formatPrice(l.price, l.currency)` |
| `cities` (матн) | `cityCodes` + `cityOptions()` → `{code,label}` |
| `conditions` (матн) | `conditionCodes` + `conditionOptions()` |
| `cat.name` | ҳамон тавр кор мекунад (`categories` тарҷумашуда сохта мешавад), калид: `cat.nameKey` |
| `type.name` | `t(type.nameKey)` |
| `attr.label` | `attrLabel(attr)` |
| `attr.options` (матн) | КОДҲО → `optLabel(attr.key, code)`; `value` = код |
| `brand.name` | `brandName(brandObj)`, value = `brandId(brandObj)`, намоиш = `brandLabel(ident)` |
| `conv.name` | `convName(c)`; `msg.text` → `msgText(m)`; `msg.time` → `msgTime(m)` |

Эълони нави корбар (post.html) бояд бо ҳамин сохт сабт шавад:
`{ id, title, description, price, currency:'somoni', category, type, brand, model,
   location:<матни озод> ё locationKey:'city.<code>', condition:'<код>', attrs:{...} }`
(матни худи корбар тарҷума намешавад — ин дуруст аст).

## 7. Калидҳо — қоидаи номгузорӣ (flat, `.` ҷудокунанда, camelCase)

```
common.*   тугмаҳо/матни умумӣ (save, cancel, all, more, loading, empty…)
nav.*      header/nav        footer.*   футер        menu.*   менюи мобилӣ
tab.*      навори поёнӣ      lang.*     switcher (аллакай ҳаст)
meta.<page>.title|desc|ogTitle|ogDesc
<page>.*   матни худи саҳифа (index.* , search.* , listing.* , post.* , profile.* ,
           messages.* , favorites.* , category.* , login.* , register.*)
ph.*       placeholder-ҳо    err.*      хатоҳои валидатсия   ok.*  паёмҳои муваффақ
cat.* type.* attr.* opt.* brand.* cond.* city.* loc.* currency.* time.* date.* demo.*
```
Калиди мавҷударо аз нав насозед — аввал `src/locales/tg.json`-ро тафтиш кунед.

## 8. Фрагментҳои тарҷума

Калидҳои нави худро ба файли фрагмент нависед:
`i18n-source/<page>.json` бо формати:

```json
{
  "search.title": { "tg": "Ҷустуҷӯ", "ru": "Поиск", "en": "Search" },
  "err.required": { "tg": "Ин майдон ҳатмист", "ru": "Обязательное поле", "en": "This field is required" }
}
```
Ҳар се забон ҲАТМӢ. Тарҷумаи табиӣ ва кӯтоҳ (мисли интерфейси Somon.tj/Avito/OLX).
Google Translate истифода набаред — тарҷумаи дастӣ.

## 9. Файлҳои муштарак — ТАҒЙИР НАДИҲЕД
`i18n.js`, `layout.js`, `data.js`, `storage.js`, `category-engine.js`, `style.css`,
`locales/*.json`, `i18n-source/core*.json`.
Агар ба калиди умумӣ (common./nav./footer./cond./city./attr./opt.) ниёз бошад ва
он набошад — онро дар фрагменти худ бо ҳамон номи умумӣ илова кунед (merge худаш
дубликатҳоро месанҷад).
