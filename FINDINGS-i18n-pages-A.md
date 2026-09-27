# i18n pages A — index / favorites / login / register (ИҶРО ШУД)

## Файлҳои тағйирдодашуда
- `src/index.html` — пурра калидшуда, switcher×2, тартиби скриптҳо, `renderPage()` + `I18N.onChange`
- `src/favorites.html` — ҳамон тавр; `renderFavorites()` + шумораи дӯстдоштаҳо (`favorites.count`)
- `src/login.html` — форма + валидатсияи бисёрзабона (`err.*`), switcher дар auth-card
- `src/register.html` — ҳамон тавр, 5 майдон/қоида + `register.agree` (data-i18n-html бо линк)

## Файлҳои нав (фрагментҳои тарҷума, ҳар се забон)
- `i18n-source/page-index.json` — 20 калид
- `i18n-source/page-favorites.json` — 9 калид
- `i18n-source/page-login.json` — 16 калид
- `i18n-source/page-register.json` — 17 калид
**Ҳамагӣ 62 калиди нав** (ҳар яке tg/ru/en, тарҷумаи дастӣ).

## Файлҳои тест (нав, root)
- `test-i18n-pages-a.js` — статикӣ: `<title>`, `lang`, switcher, tg≠ru≠en, калидҳои гумшуда, хатоҳои JS, набудани кирилл дар намуди en → **ҳама PASS**
- `test-i18n-pages-a-dynamic.js` — рафтор: карточкаҳо, рубрикаҳо, placeholder бо шумора, нигоҳдории ҳолати корбар, хатоҳои валидатсия ва фаврӣ тарҷума шудани онҳо → **ҳама PASS (27 санҷиш)**
  Иҷро: `cd /tmp/elontj-test && python3 -m http.server 8123 &` (нусхаи муваққатӣ аз тести якум сохта мешавад), баъд `node test-i18n-pages-a-dynamic.js`

## Мутобиқат бо `core-ui.json` (калидҳои такрорӣ нест)
Аз фрагменти ман хориҷ шуданд ва ба калидҳои core гузаштам:
`nav.*`, `common.find/all/close`, `menu.home/search/post/messages/favorites/profile/categories`,
`footer.categories/info/aboutUs/rules/help/contact/rights`, `city.dushanbe`,
`common.newListing` (ба ҷои `nav.postAd`), `common.postListing` (ба ҷои `index.promoBtn`),
`footer.about` = tagline-и футер (тавре ки дар core таъриф шудааст).
Калидҳои `ph.*` ва `err.*` дар core набуданд — дар фрагментҳои ман таъриф шуданд:
`ph.search`, `ph.searchCount`, `ph.emailOrPhone`, `ph.password`, `ph.name`, `ph.phone`, `ph.email`,
`err.required`, `err.emailOrPhoneInvalid`, `err.emailInvalid`, `err.passwordShort`, `err.nameShort`,
`err.phoneInvalid`, `err.termsRequired`.

## Тафтиши матни кушод
`grep` барои кирилл (диапазони `\u0400-\u04FF`; `grep -P "\p{Cyrillic}"` дар ин муҳит кор намекунад —
PCRE бе property-ҳо сохта шудааст, аз ин рӯ Python истифода шуд):
дар ҳар 4 саҳифа танҳо **комментарияҳои JS** боқӣ мондаанд. Матни интерфейс нест.
`node --check` барои ҳамаи блокҳои inline — OK.

## Қарорҳо / нуктаҳо барои parent
1. `login.html` / `register.html` header ва `.mobile-menu` надоранд → `<div data-lang-switcher></div>`
   дар болои auth-card гузошта шуд (ҳар саҳифа switcher дорад).
2. Ба auth-саҳифаҳо тартиби пурраи скриптҳо илова шуд (тавре контракт талаб мекунад); барои он ки
   `layout.js` навори поёниро дар саҳифаи воридшавӣ насозад, ба `<body>` синфи мавҷудаи
   `hide-tabbar` илова шуд (дар `style.css` аллакай ҳаст, файл тағйир нашуд).
3. Логои auth `Э` → `E` (мисли `logo-box`-и header) — то ҳарфи кириллӣ дар интерфейс намонад.
4. `footer.rights` дар core аллакай «© 2026 elon.tj. …»-ро дар бар мегирад, аз ин рӯ дар HTML
   танҳо `data-i18n="footer.rights"` монд (© дубора навишта нашуд).
5. Файлҳои муштарак (`i18n.js`, `data.js`, `storage.js`, `layout.js`, `category-engine.js`,
   `style.css`, `locales/*`) ТАҒЙИР НАШУДАНД (mtime ҳамон).
6. `src/locales/{tg,ru,en}.json` ҳанӯз сохта нашудаанд (папкаи `locales/` холӣ) — билд/merge-и
   фрагментҳо лозим аст; тестҳо bundle-ро аз `i18n-source/*.json` муваққатӣ месозанд.
