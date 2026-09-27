# Ҳисобот: i18n-и 3 саҳифаи калон (listing / post / messages)

## Файлҳои тағйирдодашуда
- `src/listing.html` — пурра бисёрзабона
- `src/post.html` — пурра бисёрзабона
- `src/messages.html` — пурра бисёрзабона

## Файлҳои нав (фрагментҳои тарҷума)
- `i18n-source/page-listing.json` — 33 калид
- `i18n-source/page-post.json` — 52 калид
- `i18n-source/page-messages.json` — 47 калид
- Ҳамагӣ: **132 калиди нав** (ҳар яке бо tg/ru/en)

Калидҳои муштарак, ки аллакай дар `core-ui.json` / `page-*.json`-и агентҳои дигар буданд,
аз фрагментҳои ман бароварда шуданд (конфликт нест). Дар саҳифаҳо ба стандарти умумӣ гузаштам:
`common.newListing`, `footer.about`, `footer.aboutUs`, `footer.rights` (бо ©), `menu.post`,
`common.optional` (қавсҳо дар HTML), `ph.search`, `time.now/today/yesterday` аз core.

## Тафтишот
- `grep -nP "[\p{Cyrillic}]" listing.html post.html messages.html` → **0 натиҷа** (ҳатто комментария кирилл надорад).
- Синтаксиси JS-и дохилии ҳар се саҳифа тафтиш шуд (`new Function`) — хато нест.
- Тартиби скриптҳо дар ҳар се саҳифа: `i18n.js → category-engine.js → data.js → storage.js → layout.js → коди саҳифа`.
- `data-lang-switcher` — 2 адад дар ҳар саҳифа (дар `.nav-btns` ва дар `.mobile-menu` пеш аз `.mobile-menu-list`).
- Ҳамаи калидҳои истифодашуда дар фрагментҳо мавҷуданд: listing 57, post 84, messages 68 калид — **0 гумшуда**.
- `python3 build.py` иҷро шуд: `src/locales/{tg,ru,en}.json` = **711 калид × 3 забон** (паритет пурра), `dist/{tg,ru,en}` сохта шуд.
  - Дар ҳисоботи build 2 «калиди гумшуда» — `date.weekday.` ва `key` — натиҷаи ғалати таҳлили динамикӣ
    (`'date.weekday.' + d.getDay()` дар messages.html ва `t(key)`-и умумӣ дар i18n.js/layout.js). Ҳамаи 7 рӯзи ҳафта мавҷуд аст.
  - «Истифоданашуда»-и ба ман тааллуқдошта (`date.weekday.*`, `messages.autoReply.*`, `messages.gotImage(s)`) низ динамикӣ садо мешаванд — воқеан истифода мешаванд.

## Ҳолати ҳар саҳифа
### listing.html
- meta/title/og бо `data-i18n-attr`; `document.title = t('meta.listing.titleWith',{title})`.
- Ҳамаи render дар `renderPage()`; `I18N.onChange(renderPage)` → забон фавран иваз мешавад бе reload.
- Ҳолат нигоҳ дошта мешавад: сурати интихобшудаи галерея (`activeImgIdx`).
- Ҷадвали §6: `listingTitle/listingDesc/listingLocation/listingCondition/listingSubcategory/userName`,
  `formatPrice/formatDate/formatNumber`, `getCategoryName`, `attrLabel/optLabel`, `brandLabel`.
- Bugfix: `id="l-price"` такрорӣ буд → дар sidebar `l-price-2` шуд.

### post.html
- Формаи динамикӣ: категория → навъ → бренд → модел → атрибутҳо, ҳама бо калид.
- `value`-и ҳар `<option>` = КОД (`brandId(b)`, коди опция, коди ҳолат аз `conditionOptions()`), матн = тарҷума.
- Шаҳр: `cityOptions()` ба `<datalist>` (матни озоди корбар мемонад).
- Эълони нав: `{..., currency:'somoni', condition:'<код>', location: матни корбар, attrs:{...}}`.
- Draft (`selCategory/selType/selBrand/selModel/selAttrs/selCondition/imgB64`) ва ҳамаи майдонҳои пуркарда ҳангоми иваз шудани забон нигоҳ дошта мешаванд.

### messages.html
- `convName/convTime/msgText/msgTime` дар ҳама ҷо; муколамаҳои нав `timeKey:'time.now'`.
- Ҷавобҳои автоматӣ бо `textKey` (`messages.autoReply.1..5`), файл/сурат бо `messages.gotImage(s)` / `messages.gotFile`.
- Ҷудокунандаи сана: `time.today` / `time.yesterday` / `date.weekday.0..6`; вақт: `time.yesterdayAt` / `time.dayAt`.
- Ҳолати online/offline, «чизе нест» (4 ҳолати холӣ), матни нависташудаи чат (`#chat-draft`) ва preview-и ҷавоб ҳангоми иваз шудани забон нигоҳ дошта мешаванд.

## Мушкилот / қарорҳои қобили таваҷҷуҳ
1. **Тағйири рафтор:** дар post.html майдонҳои «Бренд» ва «Модел» аз `input + datalist` ба `<select>` иваз шуданд —
   зарур буд, то `value` = код/номи хос бошад ва матн тарҷума шавад. Ҳоло корбар бренди дар рӯйхат набударо дастӣ навишта наметавонад.
2. `src/locales/*.json` ва `bundles.js` тавассути `build.py` аз нав сохта шуданд (дастӣ тағйир дода нашуданд).
   Агар агентҳои дигар баъдтар фрагмент илова кунанд, бояд боз `python3 build.py` иҷро шавад.
3. Дар listing.html `renderPage()` ҳам inline ҳам дар `DOMContentLoaded` даъват мешавад (идемпотент, безарар).
