# i18n pages B — search.html / category.html / profile.html

## Файлҳои тағйирдодашуда
- `src/search.html` — пурра аз нав нависта шуд (i18n + филтрҳо бо кодҳо)
- `src/category.html` — пурра аз нав нависта шуд
- `src/profile.html` — пурра аз нав нависта шуд (+ табҳо ва блоки омор)
- `i18n-source/page-search.json` — 31 калид
- `i18n-source/page-category.json` — 18 калид
- `i18n-source/page-profile.json` — 30 калид
(ҳамагӣ 79 калиди нав, ҳар се забон: tg/ru/en)

Файлҳои муштарак (`i18n.js`, `data.js`, `storage.js`, `category-engine.js`, `layout.js`, `style.css`) ТАҒЙИР НАЁФТАНД.

## Чӣ карда шуд
- `<title>`, `meta description`, `og:title`, `og:description` → `data-i18n` / `data-i18n-attr`.
- Ҳамаи `placeholder`, `title=`, `aria-label=`, матни тугмаҳо, лейблҳо, `<option>`, holati "ёфт нашуд" → калид.
- Матни бо рақам: `search.found` (`{{n}} эълон ёфт шуд`), `category.count`, `profile.listingsN`, `common.page`, `common.fromValue/toValue`, `profile.since` — ҳама тавассути `t(key,{n})`.
- Дар header (`.nav-btns`, пеш аз тугмаи «+ Эълон») ва дар `.mobile-menu` (пеш аз `.mobile-menu-list`) — `<div data-lang-switcher></div>`.
- Тартиби скриптҳо: `i18n.js → category-engine.js → data.js → storage.js → layout.js → коди саҳифа`.
- Ҳар саҳифа `renderPage()` дорад ва `I18N.onChange(...)` сабт шудааст: пеш аз re-render ҳолат аз DOM хонда мешавад (`readState()`), баъд ҳама аз нав сохта мешавад — БЕ reload, филтрҳо/сортировка/матни ҷустуҷӯ/табби фаъол нигоҳ дошта мешаванд.

## Филтрҳо — акнун бо КОДҲО (§6)
- `search.html`: `f-cat` → `slug`-и категория, `f-sub` → `slug`-и навъ (`type`), `f-city` → коди шаҳр (`cityOptions()`), `f-condition` → коди ҳолат (`conditionOptions()`), sort → `newest|cheapest|expensive|popular`. Матни option — тарҷума.
- `category.html`: checkbox-ҳои зердаста `value = type.slug` (матн `t(type.nameKey)`), бренд `value = brandId(b)` / матн `brandName(b)` / чип `brandLabel(code)`, ҳолат `value = cond code` / матн `condLabel(code)`, шаҳр `value = city code` / матн `cityLabel(code)`.
- Ҷустуҷӯ ва намоиш танҳо тавассути helper-ҳо: `listingTitle/listingDesc/listingLocation/listingSubcategory/userName/displayTitle/formatPrice/formatDate/formatNumber`.
- Мутобиқати шаҳр: коди шаҳр аз `locationKey` (`city.<code>`, `loc.<...>`) ё `l.cityCode` гирифта мешавад; барои эълони озоди корбар муқоисаи матн бо `cityLabel(code)` fallback аст.

## Тафтиш
- `LC_ALL=C.UTF-8 grep -nP "[\p{Cyrillic}]"` → танҳо комментарияҳои код (санҷида шуд: 14 / 17 / 8 сатр, ҳама комментария).
- Тести DOM (jsdom + сервери маҳаллӣ, bundle аз ҳамаи `i18n-source/*.json`): ҳар се саҳифа TG→RU→EN иваз мешавад, `console.warn('[i18n] калиди гумшуда')` — ҳеҷ.
- Ҳолат баъди иваз шудани забон нигоҳ дошта шуд (мисол: `{"cat":"transport","city":"dushanbe"}`, `{"subs":["passenger-cars"],"city":"dushanbe"}`, `{"tab":"favs"}`).

## Мушкилот / қайдҳо
1. Калидҳои умумӣ бо `core-ui.json` ҳамоҳанг карда шуданд (дубликатҳо аз фрагментҳои ман бардошта шуданд): истифода мешавад `common.newListing`, `menu.post`, `footer.about`, `footer.aboutUs`, `footer.rights`, `ph.search`, `cond.*`, `city.*`.
2. Калиди нави умумӣ, ки дар core набуд: `common.filters`, `common.showResults`, `common.sortNewest/Cheapest/Expensive/Popular`, `common.page`, `common.pagination`, `common.from/to`, `common.fromValue/toValue`, `common.remove`, `nav.breadcrumb`, `ph.searchQuery` — дар `page-search.json`/`page-category.json`.
3. Шакли ҷамъ (plural) идора намешавад — «1 listings found». Агар лозим бошад, ба ядро plural rules илова кардан лозим (ядро тағйир дода нашуд).
4. `profile.html` табҳо надошт — 3 таб илова шуд (эълонҳои ман / дӯстдоштаҳо / тамошои охирин) ва блоки омор; ҳама калиддор.
5. `locales/*.json` ҳанӯз сохта нашудаанд — build/merge-и фрагментҳо аз ҷониби қадами дигар анҷом дода мешавад.
