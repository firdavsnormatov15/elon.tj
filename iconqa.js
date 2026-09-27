const { chromium } = require('playwright');
const PAGES = ['index','search','category','listing','post','messages','favorites','profile','login','register'];
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0,100)));
  let bad = 0;
  for (const lc of ['tg','ru','en']) {
    for (const pg of PAGES) {
      const q = pg === 'category' ? '?slug=transport' : pg === 'listing' ? '?id=1' : '';
      await p.goto(`http://localhost:8140/${lc}/${pg}.html${q}`, { waitUntil: 'networkidle' });
      await p.waitForTimeout(250);
      const r = await p.evaluate(() => {
        const emoji = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}]/u;
        const leftover = [];
        const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let n; while ((n = walk.nextNode())) {
          if (emoji.test(n.nodeValue) && n.parentElement && n.parentElement.offsetParent) leftover.push(n.nodeValue.trim().slice(0,30));
        }
        const empty = [...document.querySelectorAll('[data-icon]')].filter(e => !e.querySelector('svg')).map(e => e.getAttribute('data-icon'));
        const rawSpan = document.body.innerHTML.includes('&lt;span class="ico"');
        // номи иконка ба ҷои худи иконка (масалан «paw-print» ҳамчун матн)
        const NAMES = /^(car|laptop|smartphone|house|briefcase|tv|sofa|brick-wall|guitar|shirt|blocks|wrench|building-2|paw-print|gift|package|heart|clock|banknote|gem|flame|eye|user|search|menu|x|plus|mail|phone|map-pin|message-circle|calendar|image|paperclip|copy|reply|forward|trash-2|upload|camera|star|lock|zap|shield-check|layout-grid|sliders-horizontal|arrow-left|arrow-right|heart-fill)$/;
        const nameText = [];
        const w2 = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let m2; while ((m2 = w2.nextNode())) {
          const v = m2.nodeValue.trim();
          if (v && NAMES.test(v) && m2.parentElement && m2.parentElement.offsetParent) nameText.push(v);
        }
        return { nameText: [...new Set(nameText)], svgs: document.querySelectorAll('.ico svg').length, leftover: [...new Set(leftover)], empty: [...new Set(empty)], rawSpan };
      });
      if (r.nameText.length || r.leftover.length || r.empty.length || r.rawSpan || r.svgs === 0) { bad++; console.log(lc, pg, JSON.stringify(r)); }
    }
  }
  console.log(bad === 0 ? '✓ иконкаҳо: ҳамаи 30 саҳифа тоза' : `✗ ${bad} мушкил`);
  console.log('jsErr:', [...new Set(errs)].slice(0,5));
  for (const pg of ['index','category','profile','messages','listing']) {
    await p.goto(`http://localhost:8140/ru/${pg}.html${pg==='category'?'?slug=transport':pg==='listing'?'?id=1':''}`, { waitUntil:'networkidle' });
    await p.waitForTimeout(300);
    await p.screenshot({ path: `/home/user/workspace/elontj/shots/ico-${pg}.png`, fullPage: false });
  }
  await b.close();
})();
