/* ==========================================================================
   i18n.js — ЯДРОИ СИСТЕМАИ БИСЁРЗАБОНӢ (tg / ru / en)
   ==========================================================================
   Қоидаҳо:
   1. Ҳамаи матнҳо аз /locales/tg.json, /locales/ru.json, /locales/en.json
      меоянд. Дар HTML/JS матни кушод (hardcoded) нест.
   2. Забони асосӣ (fallback) — тоҷикӣ (tg).
   3. Забон дар URL: /tg/index.html, /ru/index.html, /en/index.html
   4. Иваз кардани забон — БЕ reload (мгновенно, тавассути re-render).
   5. Забон дар localStorage ва cookie `NEXT_LOCALE` сабт мешавад.
   ========================================================================== */

window.I18N = (function () {
  'use strict';

  const LOCALES = ['tg', 'ru', 'en'];
  const DEFAULT_LOCALE = 'tg';
  const STORAGE_KEY = 'NEXT_LOCALE';
  const COOKIE_KEY = 'NEXT_LOCALE';
  const COOKIE_DAYS = 365;

  const META = {
    tg: { flag: '🇹🇯', short: 'TJ', htmlLang: 'tg', numberLocale: 'tg-TJ' },
    ru: { flag: '🇷🇺', short: 'RU', htmlLang: 'ru', numberLocale: 'ru-RU' },
    en: { flag: '🇬🇧', short: 'EN', htmlLang: 'en', numberLocale: 'en-US' },
  };

  const bundles = {};        // { tg: {...}, ru: {...} }
  const changeHooks = [];    // re-render callbacks
  let current = DEFAULT_LOCALE;

  /* ------------------------------------------------------------------ */
  /* Cookie / localStorage                                              */
  /* ------------------------------------------------------------------ */
  function readCookie(name) {
    const m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return m ? decodeURIComponent(m.pop()) : null;
  }
  function writeCookie(name, value) {
    const d = new Date();
    d.setTime(d.getTime() + COOKIE_DAYS * 864e5);
    document.cookie = name + '=' + encodeURIComponent(value) +
      ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
  }
  function readStored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function writeStored(lc) {
    try { localStorage.setItem(STORAGE_KEY, lc); } catch (e) { /* ignore */ }
  }

  /* ------------------------------------------------------------------ */
  /* Муайян кардани забон                                               */
  /* ------------------------------------------------------------------ */
  /** Индекси сегменти забон дар роҳ (охирин, то сайт дар папкаи дилхоҳ кор кунад) */
  function localeSegIndex(parts) {
    for (let i = parts.length - 1; i >= 0; i--) {
      if (LOCALES.indexOf(parts[i]) !== -1) return i;
    }
    return -1;
  }
  function localeFromPath(pathname) {
    const parts = (pathname || location.pathname).split('/').filter(Boolean);
    const i = localeSegIndex(parts);
    return i === -1 ? null : parts[i];
  }
  function localeFromBrowser() {
    const langs = navigator.languages || [navigator.language || ''];
    for (const raw of langs) {
      const code = String(raw).toLowerCase().split('-')[0];
      if (code === 'ru') return 'ru';
      if (code === 'en') return 'en';
      if (code === 'tg' || code === 'tj') return 'tg';
    }
    return null;
  }
  function detectLocale() {
    const fromUrl = localeFromPath();
    const stored0 = readStored() || readCookie(COOKIE_KEY);
    // Дар file:// (бе сервер) history.pushState кор намекунад, бинобар ин
    // URL ҳамеша папкаи аввалро нишон медиҳад — интихоби корбар муҳимтар аст.
    if (location.protocol === 'file:' && stored0 && LOCALES.indexOf(stored0) !== -1) return stored0;
    // 1) URL (муҳимтарин — барои SEO ва линкҳои мустақим)
    if (fromUrl) return fromUrl;
    // 2) Интихоби қаблии корбар
    const stored = readStored() || readCookie(COOKIE_KEY);
    if (stored && LOCALES.indexOf(stored) !== -1) return stored;
    // 3) Забони браузер (ru / en), вагарна — tg
    return localeFromBrowser() || DEFAULT_LOCALE;
  }

  /* ------------------------------------------------------------------ */
  /* Боркунии bundle                                                    */
  /* ------------------------------------------------------------------ */
  function basePath() {
    // Роҳ то папкаи ҷорӣ (дар билд ҳар забон папкаи худро дорад)
    const p = location.pathname;
    return p.slice(0, p.lastIndexOf('/') + 1);
  }
  function loadSync(lc) {
    if (bundles[lc]) return bundles[lc];
    // (a) bundle-и JS (locales/bundles.js) — агар мавҷуд бошад, шабака лозим нест.
    //     Ҳамин тавр сайт ҳатто бе сервер (file://) кор мекунад.
    if (window.__I18N_BUNDLES__ && window.__I18N_BUNDLES__[lc]) {
      bundles[lc] = window.__I18N_BUNDLES__[lc];
      return bundles[lc];
    }
    // (b) synchronous XHR — агар bundle набошад, JSON-ро бор мекунем
    try {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', basePath() + 'locales/' + lc + '.json', false);
      xhr.send(null);
      if (xhr.status === 200 || xhr.status === 0) {
        bundles[lc] = JSON.parse(xhr.responseText);
        return bundles[lc];
      }
    } catch (e) { /* file:// ё хатои шабака */ }
    return null;
  }
  function loadAsync(lc) {
    if (bundles[lc]) return Promise.resolve(bundles[lc]);
    if (window.__I18N_BUNDLES__ && window.__I18N_BUNDLES__[lc]) {
      bundles[lc] = window.__I18N_BUNDLES__[lc];
      return Promise.resolve(bundles[lc]);
    }
    return fetch(basePath() + 'locales/' + lc + '.json')
      .then(r => r.json())
      .then(j => (bundles[lc] = j))
      .catch(() => loadSync(lc));
  }

  /* ------------------------------------------------------------------ */
  /* t() — гирифтани матн                                               */
  /* ------------------------------------------------------------------ */
  function raw(key, lc) {
    const b = bundles[lc];
    if (!b) return undefined;
    return Object.prototype.hasOwnProperty.call(b, key) ? b[key] : undefined;
  }
  function interpolate(str, vars) {
    if (!vars) return str;
    return str.replace(/\{\{(\w+)\}\}/g, (m, k) =>
      (vars[k] === undefined || vars[k] === null) ? m : String(vars[k]));
  }
  /* ------------------------------------------------------------------ */
  /* Шаклҳои ҷамъ (plural): key#one / key#few / key#many / key#other     */
  /* Мисол: search.found#one → «Найдено 1 объявление»                    */
  /* ------------------------------------------------------------------ */
  const pluralCache = {};
  function pluralForm(n, lc) {
    try {
      if (!pluralCache[lc]) pluralCache[lc] = new Intl.PluralRules(META[lc].numberLocale);
      return pluralCache[lc].select(n);
    } catch (e) {
      return n === 1 ? 'one' : 'other';
    }
  }
  function pluralKey(key, vars) {
    if (!vars || vars.n === undefined || vars.n === null) return null;
    const n = typeof vars.n === 'number'
      ? vars.n
      : parseFloat(String(vars.n).replace(/[^\d.-]/g, ''));
    if (isNaN(n)) return null;
    const form = pluralForm(n, current);
    if (raw(key + '#' + form, current) !== undefined) return key + '#' + form;
    if (raw(key + '#other', current) !== undefined) return key + '#other';
    return null;
  }

  function t(key, vars) {
    const pk = pluralKey(key, vars);
    if (pk) key = pk;
    let val = raw(key, current);
    if (val === undefined) val = raw(key, DEFAULT_LOCALE);
    if (val === undefined) {
      if (window.console && !t._warned) { t._warned = {}; }
      if (window.console && t._warned && !t._warned[key]) {
        t._warned[key] = 1;
        console.warn('[i18n] калиди гумшуда:', key);
      }
      return key;
    }
    return interpolate(val, vars);
  }
  /** Матни озод (аз маълумот) → тарҷума, агар дар луғат бошад. */
  function tv(namespace, value, vars) {
    if (value === undefined || value === null || value === '') return '';
    const key = namespace + '.' + slugify(value);
    let val = raw(key, current);
    if (val === undefined) val = raw(key, DEFAULT_LOCALE);
    return val === undefined ? String(value) : interpolate(val, vars);
  }
  function has(key) {
    return raw(key, current) !== undefined || raw(key, DEFAULT_LOCALE) !== undefined;
  }
  function slugify(s) {
    return String(s).trim().toLowerCase()
      .replace(/[\s/]+/g, '-')
      .replace(/[^0-9a-zA-Zа-яёғқҳҷӯӣ+.-]/gi, '')
      .replace(/-+/g, '-');
  }

  /* ------------------------------------------------------------------ */
  /* Форматкунӣ (рақам, нарх, сана)                                     */
  /* ------------------------------------------------------------------ */
  function num(n) {
    try { return Number(n).toLocaleString(META[current].numberLocale); }
    catch (e) { return String(n); }
  }
  function price(value, currency) {
    if (Number(value) === 0) return t('common.negotiable');
    return num(value) + ' ' + (currency ? tv('currency', currency) : t('currency.somoni'));
  }
  function relTime(dateStr) {
    const date = new Date(dateStr);
    const diff = Math.floor((Date.now() - date.getTime()) / 1000);
    if (diff < 60) return t('time.now');
    if (diff < 3600) return t('time.minutesAgo', { n: Math.floor(diff / 60) });
    if (diff < 86400) return t('time.hoursAgo', { n: Math.floor(diff / 3600) });
    if (diff < 604800) return t('time.daysAgo', { n: Math.floor(diff / 86400) });
    return t('date.dayMonth', { d: date.getDate(), month: t('date.month.' + (date.getMonth() + 1)) });
  }

  /* ------------------------------------------------------------------ */
  /* Кор бо DOM                                                         */
  /* ------------------------------------------------------------------ */
  function argsOf(el) {
    const raw = el.getAttribute('data-i18n-args');
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (e) { return null; }
  }
  function apply(root) {
    const scope = root || document;

    scope.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.getAttribute('data-i18n'), argsOf(el));
    });
    scope.querySelectorAll('[data-i18n-html]').forEach(el => {
      el.innerHTML = t(el.getAttribute('data-i18n-html'), argsOf(el));
    });
    // data-i18n-attr="placeholder:ph.search;title:common.favorite"
    scope.querySelectorAll('[data-i18n-attr]').forEach(el => {
      el.getAttribute('data-i18n-attr').split(';').forEach(pair => {
        const [attr, key] = pair.split(':').map(s => (s || '').trim());
        if (attr && key) el.setAttribute(attr, t(key, argsOf(el)));
      });
    });

    if (!root) applyDocumentMeta();
  }

  function applyDocumentMeta() {
    document.documentElement.setAttribute('lang', META[current].htmlLang);
    document.documentElement.setAttribute('dir', 'ltr');
    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) document.title = t(titleEl.getAttribute('data-i18n'));
    applyHreflang();
  }

  function pageFile() {
    const f = location.pathname.split('/').pop();
    return f && f.indexOf('.') !== -1 ? f : 'index.html';
  }
  function localeUrl(lc, absolute) {
    const parts = location.pathname.split('/').filter(Boolean);
    const i = localeSegIndex(parts);
    if (i === -1) {
      // забон дар URL нест — пеш аз файл мегузорем
      parts.splice(Math.max(parts.length - 1, 0), 0, lc);
    } else {
      parts[i] = lc;
    }
    const path = '/' + parts.join('/');
    return (absolute ? location.origin : '') + path + location.search;
  }
  function applyHreflang() {
    document.querySelectorAll('link[data-i18n-hreflang]').forEach(l => l.remove());
    const head = document.head;
    LOCALES.concat(['x-default']).forEach(code => {
      const lc = code === 'x-default' ? DEFAULT_LOCALE : code;
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', code);
      link.setAttribute('href', localeUrl(lc, true));
      link.setAttribute('data-i18n-hreflang', '1');
      head.appendChild(link);
    });
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      head.appendChild(canonical);
    }
    canonical.setAttribute('href', localeUrl(current, true));
  }

  /* ------------------------------------------------------------------ */
  /* Switcher                                                           */
  /* ------------------------------------------------------------------ */
  /* Флагҳо: emoji (🇹🇯 🇷🇺 🇬🇧). Агар система emoji-и флагро накашад
     (Windows), SVG-и хурд нишон дода мешавад, то навистаи «TJ TJ» нашавад. */
  const SVG_FLAGS = {
    tg: '<svg viewBox="0 0 18 12" width="18" height="12"><rect width="18" height="4" fill="#cc0000"/><rect y="4" width="18" height="4" fill="#fff"/><rect y="8" width="18" height="4" fill="#006600"/><circle cx="9" cy="6" r="1.5" fill="#f8c300"/></svg>',
    ru: '<svg viewBox="0 0 18 12" width="18" height="12"><rect width="18" height="4" fill="#fff"/><rect y="4" width="18" height="4" fill="#0039a6"/><rect y="8" width="18" height="4" fill="#d52b1e"/></svg>',
    en: '<svg viewBox="0 0 18 12" width="18" height="12"><rect width="18" height="12" fill="#012169"/><path d="M0 0l18 12M18 0L0 12" stroke="#fff" stroke-width="2.4"/><path d="M9 0v12M0 6h18" stroke="#fff" stroke-width="4"/><path d="M9 0v12M0 6h18" stroke="#c8102e" stroke-width="2.2"/></svg>'
  };
  /* SVG истифода мешавад, зеро дар Windows ва баъзе браузерҳо emoji-и
     флаг ба ҷои сурат ҳарфҳо («TJ», «RU») нишон дода мешавад. Худи emoji
     дар META нигоҳ дошта шудааст (META[lc].flag) — агар лозим шавад. */
  function flagMarkup(lc) { return SVG_FLAGS[lc] || META[lc].flag; }

  function renderSwitchers() {
    document.querySelectorAll('[data-lang-switcher]').forEach(box => {
      box.classList.add('lang-switcher');
      box.setAttribute('role', 'group');
      box.setAttribute('aria-label', t('lang.switcherLabel'));
      box.innerHTML = LOCALES.map(lc => `
        <button type="button" class="lang-btn${lc === current ? ' active' : ''}"
                data-locale="${lc}" lang="${META[lc].htmlLang}"
                title="${t('lang.' + lc)}" aria-label="${t('lang.' + lc)}"
                aria-pressed="${lc === current}">
          <span class="lang-flag" aria-hidden="true">${flagMarkup(lc)}</span>
          <span class="lang-code">${META[lc].short}</span>
        </button>`).join('<span class="lang-sep" aria-hidden="true">|</span>');
      box.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLocale(btn.getAttribute('data-locale')));
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Нигоҳдории забон ҳангоми гузариш байни саҳифаҳо                    */
  /* Ҳар URL-и дохилӣ ба папкаи забони ҷорӣ равона мешавад:              */
  /*   /tg/search.html → /en/search.html                                */
  /* ------------------------------------------------------------------ */
  let historyOk = true;
  const SKIP_HREF = /^(#|https?:|mailto:|tel:|javascript:|data:)/i;

  function retargetUrl(rawHref, base) {
    if (!rawHref || SKIP_HREF.test(rawHref)) return null;
    let u;
    try { u = new URL(rawHref, base || document.baseURI); } catch (e) { return null; }
    if (u.origin !== location.origin && location.protocol !== 'file:') return null;
    const parts = u.pathname.split('/');
    let idx = -1;
    for (let i = parts.length - 1; i >= 0; i--) {
      if (LOCALES.indexOf(parts[i]) !== -1) { idx = i; break; }
    }
    if (idx === -1 || parts[idx] === current) return null;
    parts[idx] = current;
    u.pathname = parts.join('/');
    return u.href;
  }

  function retargetLinks() {
    document.querySelectorAll('a[href]').forEach(a => {
      const fixed = retargetUrl(a.getAttribute('href'));
      if (fixed) a.setAttribute('href', fixed);
    });
    document.querySelectorAll('form[action]').forEach(f => {
      const fixed = retargetUrl(f.getAttribute('action'));
      if (fixed) f.setAttribute('action', fixed);
    });
  }

  /* Барои элементҳои динамикӣ — дар лаҳзаи пахш кардан ислоҳ мекунем */
  function installNavGuard() {
    document.addEventListener('click', ev => {
      const a = ev.target && ev.target.closest ? ev.target.closest('a[href]') : null;
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const fixed = retargetUrl(a.getAttribute('href'));
      if (fixed) { ev.preventDefault(); location.href = fixed; }
    }, true);
    document.addEventListener('submit', ev => {
      const f = ev.target;
      if (!f || !f.getAttribute) return;
      const fixed = retargetUrl(f.getAttribute('action') || '');
      if (fixed) f.setAttribute('action', fixed);
    }, true);
  }

  /* ------------------------------------------------------------------ */
  /* Иваз кардани забон — БЕ reload                                     */
  /* ------------------------------------------------------------------ */
  function setLocale(lc) {
    if (LOCALES.indexOf(lc) === -1 || lc === current) return Promise.resolve();
    return Promise.resolve(loadAsync(lc)).then(() => {
      current = lc;
      writeStored(lc);
      writeCookie(COOKIE_KEY, lc);
      // URL-ро бе reload иваз мекунем: /tg/... → /ru/...
      try { history.pushState({ locale: lc }, '', localeUrl(lc)); }
      catch (e) { historyOk = false; /* file:// — URL иваз намешавад */ }
      retargetLinks();          // ҳамаи линкҳо ба папкаи забони нав нигоҳ мекунанд
      apply();                 // ҳамаи матнҳои статикӣ
      renderSwitchers();       // худи switcher
      changeHooks.forEach(fn => { try { fn(lc); } catch (e) { console.error(e); } });
      document.dispatchEvent(new CustomEvent('i18n:change', { detail: { locale: lc } }));
    });
  }

  function onChange(fn) { if (typeof fn === 'function') changeHooks.push(fn); }

  /* ------------------------------------------------------------------ */
  /* Оғоз (синхронӣ, то матн бе «ҷаҳиш» намоён шавад)                   */
  /* ------------------------------------------------------------------ */
  function init() {
    current = detectLocale();
    if (!loadSync(current) && current !== DEFAULT_LOCALE) {
      current = DEFAULT_LOCALE;
      loadSync(current);
    }
    if (current !== DEFAULT_LOCALE) loadSync(DEFAULT_LOCALE); // fallback bundle
    writeStored(current);
    writeCookie(COOKIE_KEY, current);
    document.documentElement.setAttribute('lang', META[current].htmlLang);

    const boot = () => { apply(); renderSwitchers(); retargetLinks(); installNavGuard(); };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', boot);
    } else boot();

    window.addEventListener('popstate', () => {
      const lc = localeFromPath();
      if (lc && lc !== current) setLocale(lc);
    });
  }

  init();

  return {
    LOCALES, DEFAULT_LOCALE, META,
    get locale() { return current; },
    t, tv, has, apply, setLocale, onChange,
    num, price, relTime, localeUrl, slugify,
    renderSwitchers,
  };
})();

/* Alias-ҳои глобалӣ — то дар код танҳо t("key") нависем */
function t(key, vars) { return window.I18N.t(key, vars); }
function tv(ns, value, vars) { return window.I18N.tv(ns, value, vars); }
