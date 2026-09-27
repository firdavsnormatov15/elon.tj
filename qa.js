/* QA: ҳамаи саҳифаҳо × 3 забон — калиди гумшуда, хатои JS, забони <html>, скриншот */
const { chromium } = require('playwright');
const fs = require('fs');

const BASE = 'http://localhost:8140';
const LOCALES = ['tg', 'ru', 'en'];
const PAGES = ['index.html','search.html','category.html?cat=transport','listing.html?id=1',
               'post.html','messages.html','favorites.html','profile.html','login.html','register.html'];
const SHOTS = ['index.html','search.html','listing.html?id=1','post.html'];

(async () => {
  fs.mkdirSync('/home/user/workspace/elontj/shots', { recursive: true });
  const browser = await chromium.launch();
  let fail = 0;
  for (const lc of LOCALES) {
    for (const p of PAGES) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
      const problems = [];
      page.on('console', m => {
        const t = m.text();
        if (/калиди гумшуда|missing key/i.test(t)) problems.push('MISSING KEY: ' + t);
        else if (m.type() === 'error') problems.push('CONSOLE ERROR: ' + t);
      });
      page.on('pageerror', e => problems.push('JS ERROR: ' + e.message));
      await page.goto(`${BASE}/${lc}/${p}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(400);
      const lang = await page.getAttribute('html', 'lang');
      const title = await page.title();
      const hreflang = await page.$$eval('link[rel=alternate]', ls => ls.length);
      const active = await page.$$eval('.lang-btn.active', b => b.map(x => x.textContent.trim()));
      // матни боқимондаи калид (key.like.this) дар намуд
      const rawKeys = await page.evaluate(() => {
        const bad = [];
        document.querySelectorAll('body *').forEach(el => {
          if (el.children.length) return;
          if (/^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE)$/.test(el.tagName)) return;
          const s = (el.textContent || '').trim();
          if (/^[a-z][\w]*(\.[\w+#-]+){1,4}$/.test(s) && !s.includes(' ') && !/\.(html|js|css|png|jpg)$/.test(s)) bad.push(s);
        });
        return [...new Set(bad)];
      });
      // ҳарфи кириллӣ дар намуди en
      let cyr = [];
      if (lc === 'en') {
        cyr = await page.evaluate(() => {
          const out = [];
          document.querySelectorAll('body *').forEach(el => {
            if (el.children.length) return;
            if (/^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE)$/.test(el.tagName)) return;
            if (el.closest('script,style,noscript,template')) return;
            const s = (el.textContent || '').trim();
            if (/[\u0400-\u04FF]/.test(s)) out.push(s.slice(0, 40));
          });
          return [...new Set(out)].slice(0, 8);
        });
      }
      const ok = problems.length === 0 && lang === lc && rawKeys.length === 0 && cyr.length === 0 && hreflang >= 3;
      if (!ok) fail++;
      console.log(`${ok ? '✓' : '✗'} ${lc}/${p}  lang=${lang} hreflang=${hreflang} active=${active} title="${title.slice(0,45)}"`);
      problems.slice(0, 4).forEach(x => console.log('     ' + x));
      if (rawKeys.length) console.log('     RAW KEYS: ' + rawKeys.slice(0, 6).join(', '));
      if (cyr.length) console.log('     CYRILLIC IN EN: ' + cyr.join(' | '));
      if (SHOTS.includes(p)) {
        await page.screenshot({ path: `/home/user/workspace/elontj/shots/${lc}-${p.replace(/[?=]/g, '_')}.png`, fullPage: false });
      }
      await page.close();
    }
  }

  // Тести иваз кардани забон БЕ reload
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  let reloaded = 0;
  page.on('load', () => reloaded++);
  await page.goto(`${BASE}/tg/search.html?q=&cat=transport`, { waitUntil: 'networkidle' });
  const loadsAfter = reloaded;
  const before = await page.textContent('h1').catch(() => '');
  await page.click('.lang-btn[data-locale="ru"]');
  await page.waitForTimeout(350);
  const afterRu = await page.textContent('h1').catch(() => '');
  const urlRu = page.url();
  await page.click('.lang-btn[data-locale="en"]');
  await page.waitForTimeout(350);
  const afterEn = await page.textContent('h1').catch(() => '');
  const urlEn = page.url();
  const ls = await page.evaluate(() => [localStorage.getItem('NEXT_LOCALE'), document.cookie, document.documentElement.lang]);
  console.log(`\nSWITCHER: "${before.trim()}" → "${afterRu.trim()}" → "${afterEn.trim()}"`);
  console.log(`  URL: ${urlRu} → ${urlEn}`);
  console.log(`  reload-ҳои иловагӣ: ${reloaded - loadsAfter} (бояд 0)`);
  console.log(`  localStorage=${ls[0]}  cookie=${ls[1]}  html.lang=${ls[2]}`);
  if (reloaded - loadsAfter !== 0 || ls[0] !== 'en' || !/NEXT_LOCALE=en/.test(ls[1]) || !urlEn.includes('/en/')) fail++;
  await browser.close();
  console.log(fail === 0 ? '\n✓✓ ҳамааш ОК' : `\n✗ ${fail} мушкил`);
  process.exit(fail ? 1 : 0);
})();
