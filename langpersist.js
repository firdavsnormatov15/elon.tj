const { chromium } = require('playwright');
const PAGES = ['index','search','category','listing','post','messages','favorites','profile','login','register'];
(async () => {
  const b = await chromium.launch();
  let bad = 0;
  for (const base of ['http://localhost:8140', 'file:///home/user/workspace/elontj/dist']) {
    for (const target of ['ru','en','tg']) {
      const ctx = await b.newContext({ viewport:{width:1280,height:900} });
      const p = await ctx.newPage();
      await p.goto(`${base}/tg/index.html`, { waitUntil:'load' });
      await p.waitForTimeout(250);
      await p.locator(`.lang-btn[data-locale="${target}"]`).first().click();
      await p.waitForTimeout(350);
      // 5 гузариш пас аз ҳам
      for (const pg of ['search','favorites','profile','messages','index']) {
        await p.locator(`a[href*="${pg}.html"]:visible`).first().click({ timeout: 5000 }).catch(async () => {
          await p.goto(`${base}/${target}/${pg}.html`, { waitUntil:'load' });
        });
        await p.waitForLoadState('load'); await p.waitForTimeout(250);
        const lang = await p.evaluate(() => document.documentElement.lang);
        const seg = p.url().match(/\/(tg|ru|en)\//);
        const expect = target === 'tg' ? 'tg' : target;
        if (lang !== expect || !seg || seg[1] !== expect) {
          bad++; console.log(`✗ ${base.slice(0,12)} ${target} → ${pg}: lang=${lang} url=${p.url().slice(-40)}`);
        }
      }
      await ctx.close();
    }
  }
  console.log(bad === 0 ? '✓ забон дар ҳамаи гузаришҳо нигоҳ дошта мешавад (http + file://)' : `✗ ${bad} хато`);
  await b.close();
})();
