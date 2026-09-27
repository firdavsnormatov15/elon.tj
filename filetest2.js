const { chromium } = require('playwright');
const PAGES = ['index.html','search.html','category.html?cat=transport','listing.html?id=1','post.html','messages.html','favorites.html','profile.html','login.html','register.html'];
(async () => {
  const b = await chromium.launch();
  let bad = 0;
  for (const p of PAGES) {
    const page = await b.newPage();
    const errs = [];
    page.on('console', m => { if (m.type()==='error' || /гумшуда|missing/i.test(m.text())) errs.push(m.text().slice(0,90)); });
    page.on('pageerror', e => errs.push('JS: ' + e.message.slice(0,90)));
    await page.goto('file:///home/user/workspace/elontj/dist/tg/' + p);
    await page.waitForTimeout(500);
    // забонро иваз мекунем (дар file:// pushState кор намекунад — бояд хато надиҳад)
    await page.click('.lang-btn[data-locale="ru"]');
    await page.waitForTimeout(400);
    const visible = () => page.evaluate(() => {
      let out = [];
      document.querySelectorAll('body *').forEach(el => {
        if (el.children.length) return;
        if (/^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE)$/.test(el.tagName)) return;
        const s = (el.textContent || '').trim();
        if (s) out.push(s);
      });
      return out.join(' | ');
    });
    const cyrRu = /[А-Яа-я]/.test(await visible());
    await page.click('.lang-btn[data-locale="en"]');
    await page.waitForTimeout(400);
    const body = await visible();
    const rawKeys = /(^|\| )(menu|common|cat|type|meta|err|ph|listing|post|search|profile|home|footer|nav|tab|opt|attr|demo)\.[a-z]/.test(body);
    const ok = errs.length === 0 && cyrRu && !rawKeys;
    if (!ok) { bad++; console.log(`✗ ${p} errs=${errs.slice(0,3)} ru=${cyrRu} rawKeys=${rawKeys}`); }
    else console.log(`✓ ${p} (tg→ru→en бе хато)`);
    await page.close();
  }
  await b.close();
  console.log(bad ? `✗ ${bad} мушкил` : '\n✓✓ file:// — ҳамааш кор мекунад');
})();
