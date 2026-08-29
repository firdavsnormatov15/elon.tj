/* Санҷиши автоматии саҳифаҳо: index / favorites / login / register
   (танҳо барои тест — нусхаи муваққатии саҳифаҳо дар /tmp сохта мешавад) */
const fs = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require('/tmp/node_modules/jsdom');

const ROOT = '/home/user/workspace/elontj';
const SRC = path.join(ROOT, 'src');
const TMP = '/tmp/elontj-test';
const PAGES = ['index.html', 'favorites.html', 'login.html', 'register.html'];

/* 1) bundle-ҳоро аз фрагментҳо месозем */
const frags = {};
fs.readdirSync(path.join(ROOT, 'i18n-source')).filter(f => f.endsWith('.json')).forEach(f => {
  Object.assign(frags, JSON.parse(fs.readFileSync(path.join(ROOT, 'i18n-source', f), 'utf8')));
});
const bundles = { tg: {}, ru: {}, en: {} };
Object.entries(frags).forEach(([k, v]) => ['tg', 'ru', 'en'].forEach(lc => { bundles[lc][k] = v[lc]; }));

/* 2) нусхаи муваққатӣ */
fs.rmSync(TMP, { recursive: true, force: true });
fs.mkdirSync(TMP, { recursive: true });
fs.readdirSync(SRC).filter(f => f.endsWith('.js') || f.endsWith('.css') || f.endsWith('.html'))
  .forEach(f => fs.copyFileSync(path.join(SRC, f), path.join(TMP, f)));
fs.writeFileSync(path.join(TMP, 'bundles.js'), 'window.__I18N_BUNDLES__=' + JSON.stringify(bundles) + ';');
PAGES.forEach(p => {
  let s = fs.readFileSync(path.join(TMP, p), 'utf8');
  s = s.replace('<script src="i18n.js"></script>', '<script src="bundles.js"></script>\n<script src="i18n.js"></script>');
  fs.writeFileSync(path.join(TMP, p), s);
});

let fails = 0;
(async () => {
  for (const page of PAGES) {
    const warns = [];
    const vc = new VirtualConsole();
    vc.on('jsdomError', e => warns.push('ERROR ' + e.message));
    vc.on('warn', m => warns.push('WARN ' + m));
    vc.on('error', m => warns.push('CONSOLE-ERROR ' + m));

    const dom = await JSDOM.fromFile(path.join(TMP, page), {
      runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true,
      virtualConsole: vc,
    });
    dom.window.fetch = () => Promise.reject(new Error('offline test'));
    await new Promise(r => setTimeout(r, 400));
    const w = dom.window, d = w.document;

    const visible = () => {
      const c = d.body.cloneNode(true);
      c.querySelectorAll('script,style').forEach(x => x.remove());
      return c.textContent.replace(/\s+/g, ' ').trim();
    };
    await w.I18N.setLocale('tg');
    await new Promise(r => setTimeout(r, 150));
    const snapTg = visible();
    const titleTg = d.title;
    const switchers = d.querySelectorAll('[data-lang-switcher] .lang-btn').length;

    // иваз кардани забон → бе reload
    await w.I18N.setLocale('ru');
    await new Promise(r => setTimeout(r, 200));
    const snapRu = visible();
    await w.I18N.setLocale('en');
    await new Promise(r => setTimeout(r, 200));
    const snapEn = visible();

    const checks = [];
    checks.push(['title tg', !!titleTg && !titleTg.includes('meta.')]);
    const titleEn = d.title;
    checks.push(['title en changed', titleEn !== titleTg]);
    console.log('   title tg:', titleTg, '| en:', titleEn);
    checks.push(['lang attr = en', d.documentElement.getAttribute('lang') === 'en']);
    checks.push(['switcher buttons >= 3', switchers >= 3]);
    checks.push(['tg != ru', snapTg !== snapRu]);
    checks.push(['ru != en', snapRu !== snapEn]);
    checks.push(['no missing keys', !warns.some(x => x.includes('калиди гумшуда'))]);
    checks.push(['no js errors', !warns.some(x => x.startsWith('ERROR') || x.startsWith('CONSOLE-ERROR'))]);
    checks.push(['no cyrillic in en view', !/[\u0400-\u04FF]/.test(
      snapEn.replace(/\+992[^ ]*/g, ''))]);

    console.log('=== ' + page);
    checks.forEach(([n, ok]) => { if (!ok) fails++; console.log('   ' + (ok ? 'PASS' : 'FAIL') + ' ' + n); });
    if (warns.length) console.log('   warns: ' + warns.slice(0, 8).join(' | '));
    if (/[\u0400-\u04FF]/.test(snapEn)) {
      const m = snapEn.match(/[^ ]*[\u0400-\u04FF][^ ]*/g);
      console.log('   cyrillic(en):', [...new Set(m)].slice(0, 12).join(', '));
    }
    dom.window.close();
  }
  console.log(fails ? '\nFAILS: ' + fails : '\nҲАМА PASS');
})();
