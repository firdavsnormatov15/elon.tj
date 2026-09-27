/* ==========================================================================
   layout.js — функсияҳои умумии интерфейс (БИСЁРЗАБОНӢ)
   ==========================================================================
   Ҳамаи матнҳо аз t("key"). Ҳангоми иваз шудани забон ҳамаи блокҳои
   динамикӣ (карточкаҳо, меню, футер, навори поёнӣ) аз нав сохта мешаванд —
   БЕ reload-и саҳифа.
   ========================================================================== */

function toggleMenu(){
  const m = document.getElementById('mobileMenu');
  if (!m) return;
  m.classList.toggle('active');
  document.body.style.overflow = m.classList.contains('active') ? 'hidden' : '';
}

/** Сарлавҳаи намоишӣ: «Бренд Модел, Сол» (мисли сомон.тҷ) */
function displayTitle(l){
  const own = listingTitle(l);
  if (own) return own;          // сарлавҳаи тарҷумашуда (демо) ё матни худи корбар
  if (l.brand && l.model) {
    const year = l.year || ((l.attrs && l.attrs.year) ? l.attrs.year : null);
    return brandLabel(l.brand) + ' ' + l.model + (year ? ', ' + year : '');
  }
  return listingTitle(l);
}

function renderCard(l){
  const bg = imgColors[parseInt(String(l.id).replace(/\D/g,'')||'0') % imgColors.length];
  const fav = isFavorite(l.id);
  const imgCount = (l.images && l.images.length > 1)
    ? `<span class="badge-imgcount"><span class="ico" data-icon="camera"></span> 1/${l.images.length}</span>` : '';
  return `<a href="listing.html?id=${l.id}" class="card">
    <div class="card-img" style="background:${bg};">
      <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:48px;opacity:0.32;">${iconHTML(catIcons[l.category]||'package')}</div>
      <button class="fav-btn ${fav?'active':''}" title="${t('common.favorite')}" aria-label="${t('common.favorite')}" onclick="event.preventDefault();event.stopPropagation();handleFavClick(this,'${l.id}')">${iconHTML(fav ? 'heart-fill' : 'heart')}</button>
      <span class="badge-condition">${listingCondition(l)}</span>
      ${imgCount}
    </div>
    <div class="card-body">
      <div class="card-price-row">
        <span class="card-price">${formatPrice(l.price, l.currency)}</span>
        <span class="card-views" title="${t('common.views')}"><span class="ico" data-icon="eye"></span> ${formatNumber(l.views || 0)}</span>
      </div>
      <div class="card-title">${displayTitle(l)}</div>
      <div class="card-meta"><span><span class="ico" data-icon="map-pin"></span> ${listingLocation(l)}</span><span><span class="ico" data-icon="clock"></span> ${formatDate(l.createdAt)}</span></div>
      <div class="card-footer">
        <div style="width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,var(--brand),var(--accent));display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:bold;">${(userName(l.author)||'?').charAt(0)}</div>
        <span style="font-size:12px;color:#475569;">${userName(l.author)}</span>
      </div>
    </div>
  </a>`;
}

function handleFavClick(btn, id){
  const active = toggleFavorite(id);
  btn.innerHTML = iconHTML(active ? 'heart-fill' : 'heart');
  btn.classList.toggle('active', active);
}

function renderRVSection(){
  const slot = document.getElementById('rv-section');
  if (!slot) return;
  const seen = getRecentlyViewedListings();
  if (!seen.length) { slot.style.display = 'none'; return; }
  slot.style.display = 'block';
  slot.innerHTML = `
    <div class="container">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <h2 class="section-title" style="margin-bottom:0;"><span class="ico" data-icon="clock"></span> ${t('home.recentlyViewed')}</h2>
      </div>
      <div class="rv-scroll">${seen.map(renderCard).join('')}</div>
    </div>
  `;
}

/* ---- Badge-и паёмҳои хонда нашуда ---- */
function renderUnreadBadges(){
  const unread = getUnreadCount();
  document.querySelectorAll('a[href="messages.html"].nav-btn').forEach(btn => {
    btn.querySelectorAll('.nav-badge').forEach(x => x.remove());
    if (unread > 0) {
      btn.style.position = 'relative';
      const dot = document.createElement('span');
      dot.className = 'nav-badge';
      dot.textContent = unread > 9 ? '9+' : unread;
      btn.appendChild(dot);
    }
  });
}

/* ---- Футер: рубрикаҳо ---- */
function renderFooterCats(){
  const box = document.getElementById('footer-cats');
  if (!box) return;
  box.innerHTML = categories.map(c =>
    `<a href="category.html?slug=${c.slug}">${c.name}</a>`).join('');
}

/* ---- Менюи мобилӣ: рубрикаҳо ---- */
function renderMobileCats(){
  const box = document.getElementById('mobile-cats');
  if (!box) return;
  box.innerHTML = categories.map(c => `
    <a href="category.html?slug=${c.slug}">
      <span style="font-size:26px;">${iconHTML(catIcons[c.slug]||'wrench')}</span>
      <span>${c.name}</span>
    </a>
  `).join('');
}

/* ---- Навори поёнии мобилӣ ---- */
function renderTabBar(){
  const old = document.querySelector('.mobile-tabbar');
  if (old) old.remove();
  if (document.body.classList.contains('hide-tabbar')) return;
  const page = location.pathname.split('/').pop() || 'index.html';
  const unreadTab = getUnreadCount();
  const tabs = [
    { href: 'index.html', icon: 'house', label: t('tab.home') },
    { href: 'favorites.html', icon: 'heart', label: t('tab.favorites') },
    { href: 'post.html', icon: 'plus', label: '', post: true, aria: t('tab.post') },
    { href: 'messages.html', icon: 'message-circle', label: t('tab.messages'), badge: unreadTab },
    { href: 'profile.html', icon: 'user', label: t('tab.profile') },
  ];
  const bar = document.createElement('nav');
  bar.className = 'mobile-tabbar';
  bar.setAttribute('aria-label', t('nav.mainNav'));
  bar.innerHTML = tabs.map(tb => `
    <a href="${tb.href}" class="${page === tb.href ? 'active' : ''}" ${tb.aria ? `aria-label="${tb.aria}"` : ''}>
      <span class="tab-icon ${tb.post ? 'tab-post' : ''}">${iconHTML(tb.icon)}</span>
      ${tb.label ? `<span>${tb.label}</span>` : ''}
      ${tb.badge ? `<span class="nav-badge" style="position:absolute;top:-2px;right:6px;">${tb.badge > 9 ? '9+' : tb.badge}</span>` : ''}
    </a>
  `).join('');
  document.body.appendChild(bar);
}

/** Ҳамаи қисмҳои умумии интерфейс (chrome) */
function renderChrome(){
  renderRVSection();
  renderUnreadBadges();
  renderFooterCats();
  renderMobileCats();
  renderTabBar();
}

document.addEventListener('DOMContentLoaded', renderChrome);

/* Иваз шудани забон <span class="ico" data-icon="arrow-right"></span> ҳамаи қисмҳои умумӣ аз нав сохта мешаванд */
if (window.I18N) window.I18N.onChange(renderChrome);
