const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const page = await b.newPage({ viewport: { width: 1280, height: 900 } });
  const errs = [];
  page.on('pageerror', e => errs.push('JS: ' + e.message.slice(0,100)));
  page.on('console', m => { if (/гумшуда|missing key/i.test(m.text())) errs.push(m.text().slice(0,90)); });
  const B = 'http://localhost:8140/ru/';

  await page.goto(B + 'index.html', { waitUntil: 'networkidle' });
  await page.locator("a[href*=\"category.html\"]:visible").first().click();
  await page.waitForTimeout(600);
  console.log('1. Категория:', page.url().split('/').pop(), '| сарлавҳа:', (await page.textContent('h1')).trim().slice(0,40));

  await page.goto(B + 'search.html?q=iPhone', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const found = (await page.textContent('body')).match(/Найдено[^|]{0,30}/);
  console.log('2. Ҷустуҷӯ "iPhone":', found ? found[0].trim() : '—');

  // Дӯстдошта
  await page.goto(B + 'index.html', { waitUntil: 'networkidle' });
  await page.locator(".card-fav, .fav-btn, [onclick*=\"toggleFavorite\"]").filter({ visible: true }).first().click();
  await page.waitForTimeout(300);
  await page.goto(B + 'favorites.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const favCount = await page.locator('.card').count();
  console.log('3. Дӯстдоштаҳо баъди пахш:', favCount, 'карточка');

  // Валидатсияи форма
  await page.goto(B + 'post.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  const submit = page.locator('button[type="submit"], .btn-submit, #submit-btn').first();
  await submit.click({ force: true }).catch(()=>{});
  await page.waitForTimeout(400);
  const errText = await page.evaluate(() => {
    const e = [...document.querySelectorAll('.form-error, .error-text, [data-err-key]')]
      .map(x => x.textContent.trim()).filter(Boolean);
    return e.slice(0,2);
  });
  console.log('4. Хатои валидатсия (ru):', errText);

  // Паёмҳо
  await page.goto(B + 'messages.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const convs = await page.locator('.conv-item, .conversation, .chat-item').count();
  console.log('5. Паёмҳо: суҳбатҳо =', convs);

  console.log('ERRORS:', errs.slice(0,5));
  await b.close();
})();
