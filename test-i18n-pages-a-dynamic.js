/* Санҷиши рафтори динамикӣ: дӯстдоштаҳо + хатоҳои валидатсия ҳангоми иваз шудани забон */
const path = require('path');
const { JSDOM } = require('/tmp/node_modules/jsdom');
const TMP = '/tmp/elontj-test';           // аз test-i18n-pages-a.js сохта мешавад

async function load(page) {
  const dom = await JSDOM.fromURL('http://127.0.0.1:8123/' + page, {
    runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true,
  });
  dom.window.fetch = () => Promise.reject(new Error('offline test'));
  await new Promise(r => setTimeout(r, 400));
  await dom.window.I18N.setLocale('tg');
  await new Promise(r => setTimeout(r, 150));
  return dom;
}
const results = [];
const check = (n, ok, extra) => { results.push([n, ok, extra]); };

(async () => { try {
  /* ---- favorites.html ---- */
  {
    const dom = await load('favorites.html');
    const w = dom.window, d = w.document;
    w.localStorage.setItem('elontj_favorites', JSON.stringify(['1', '4']));
    w.renderFavorites();
    const cards = d.querySelectorAll('#fav-grid .card').length;
    const countTg = d.getElementById('fav-count').textContent;
    const gridTg = d.getElementById('fav-grid').textContent;
    await w.I18N.setLocale('ru');
    await new Promise(r => setTimeout(r, 200));
    const countRu = d.getElementById('fav-count').textContent;
    const gridRu = d.getElementById('fav-grid').textContent;
    check('fav: 2 карточка', cards === 2, cards);
    check('fav: count калид кор мекунад', /\d/.test(countTg) && !countTg.includes('favorites.count'), countTg);
    check('fav: count тарҷума мешавад', countTg !== countRu, countTg + ' → ' + countRu);
    check('fav: карточкаҳо тарҷума мешаванд', gridTg !== gridRu);
    check('fav: холӣ пинҳон аст', d.getElementById('fav-empty').style.display === 'none');
    // ҳамаро хориҷ мекунем → блоки холӣ
    w.localStorage.setItem('elontj_favorites', '[]');
    w.renderFavorites();
    check('fav: блоки холӣ намоён', d.getElementById('fav-empty').style.display === 'block');
    check('fav: матни холӣ тарҷумашуда', /[А-Яа-яЁё]/.test(d.getElementById('fav-empty').textContent));
    dom.window.close();
  }

  /* ---- index.html ---- */
  {
    const dom = await load('index.html');
    const w = dom.window, d = w.document;
    const inp = d.querySelector('.search-box input[name="q"]');
    inp.value = 'Camry';                       // ҳолати корбар
    const phTg = inp.getAttribute('placeholder');
    const cardsTg = d.querySelectorAll('#latest-grid .card').length;
    const catsTg = d.querySelectorAll('#home-cat-grid .cat-card').length;
    const catTextTg = d.getElementById('home-cat-grid').textContent;
    const cardTextTg = d.getElementById('latest-grid').textContent;
    await w.I18N.setLocale('en');
    await new Promise(r => setTimeout(r, 250));
    check('index: 12 карточка', cardsTg === 12, cardsTg);
    check('index: рубрикаҳо намоён', catsTg > 5, catsTg);
    check('index: placeholder бо шумора', /\d/.test(phTg) && !phTg.includes('ph.'), phTg);
    check('index: placeholder тарҷума шуд', inp.getAttribute('placeholder') !== phTg, inp.getAttribute('placeholder'));
    check('index: матни ҷустуҷӯи корбар нигоҳ дошта шуд', inp.value === 'Camry');
    check('index: рубрикаҳо тарҷума шуданд', d.getElementById('home-cat-grid').textContent !== catTextTg);
    check('index: карточкаҳо тарҷума шуданд', d.getElementById('latest-grid').textContent !== cardTextTg);
    check('index: switcher дар меню ҳаст', d.querySelectorAll('.mobile-menu [data-lang-switcher] .lang-btn').length >= 3);
    check('index: switcher дар header ҳаст', d.querySelectorAll('.nav-btns [data-lang-switcher] .lang-btn').length >= 3);
    dom.window.close();
  }

  /* ---- login.html ---- */
  {
    const dom = await load('login.html');
    const w = dom.window, d = w.document;
    const email = d.getElementById('login-email'), pass = d.getElementById('login-password');
    email.value = 'not-an-email';
    pass.value = '123';
    d.getElementById('login-form').dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true }));
    const e1 = d.querySelector('.error-msg[data-err-for="login-email"]');
    const e2 = d.querySelector('.error-msg[data-err-for="login-password"]');
    const tgErr = e1.textContent, tgErr2 = e2.textContent;
    check('login: хатои email намоён', e1.classList.contains('show') && !!tgErr && !tgErr.startsWith('err.'), tgErr);
    check('login: хатои парол намоён', e2.classList.contains('show') && !!tgErr2, tgErr2);
    await w.I18N.setLocale('en');
    await new Promise(r => setTimeout(r, 200));
    check('login: хато ба en тарҷума шуд', e1.textContent !== tgErr && !/[\u0400-\u04FF]/.test(e1.textContent), e1.textContent);
    check('login: маълумоти корбар нигоҳ дошта шуд', email.value === 'not-an-email' && pass.value === '123');
    check('login: placeholder тарҷума шуд', !/[\u0400-\u04FF]/.test(email.getAttribute('placeholder')), email.getAttribute('placeholder'));
    // дурустшуда → хато мебарояд
    email.dispatchEvent(new w.Event('input', { bubbles: true }));
    check('login: хато баъди вироиш пинҳон мешавад', !e1.classList.contains('show'));
    dom.window.close();
  }

  /* ---- register.html ---- */
  {
    const dom = await load('register.html');
    const w = dom.window, d = w.document;
    d.getElementById('register-form').dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true }));
    const boxes = [...d.querySelectorAll('.error-msg.show')];
    check('register: 5 хато намоён', boxes.length === 5, boxes.length);
    check('register: ҳамаи хатоҳо матн доранд', boxes.every(b => b.textContent && !b.textContent.startsWith('err.')));
    const terms = d.querySelector('.error-msg[data-err-for="reg-terms"]').textContent;
    await w.I18N.setLocale('ru');
    await new Promise(r => setTimeout(r, 200));
    check('register: хатоҳо ба ru тарҷума шуданд',
      d.querySelector('.error-msg[data-err-for="reg-terms"]').textContent !== terms);
    check('register: розигӣ HTML-линк дорад', !!d.querySelector('[data-i18n-html="register.agree"] a'));
    d.getElementById('reg-terms').checked = true;
    d.getElementById('reg-terms').dispatchEvent(new w.Event('change', { bubbles: true }));
    check('register: хатои қоидаҳо пас аз тик пинҳон', !d.querySelector('.error-msg[data-err-for="reg-terms"]').classList.contains('show'));
    dom.window.close();
  }

  let f = 0;
  results.forEach(([n, ok, x]) => { if (!ok) f++; console.log((ok ? 'PASS ' : 'FAIL ') + n + (x !== undefined ? '  [' + x + ']' : '')); });
  console.log(f ? '\nFAILS: ' + f : '\nҲАМА PASS');
 } catch(e){ console.log('THROWN:', e && (e.stack || e.message || String(e)), JSON.stringify(e)); }
})();
