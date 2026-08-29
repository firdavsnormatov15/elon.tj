/* ==========================================================================
   data.js — маълумоти намунавӣ (БИСЁРЗАБОНӢ)
   ==========================================================================
   Дар ин файл матни кушод нест. Ҳар матн калид дорад:
   - эълонҳои намунавӣ: titleKey / descKey
   - корбарон: nameKey
   - шаҳрҳо: код (city.<code>), ҳолат: код (cond.<code>)
   Эълонҳое, ки худи корбар менависад (post.html) — матни воқеии корбар
   мемонад (онро тарҷума кардан лозим нест).
   ========================================================================== */

/* `categories` аз CATEGORY_TREE сохта мешавад — як манбаи ягона.
   Ҳангоми иваз шудани забон аз нав сохта мешавад (I18N.onChange). */
function buildCategories() {
  return CATEGORY_TREE.map((c, i) => ({
    id: String(i + 1),
    name: t(c.nameKey),
    nameKey: c.nameKey,
    slug: c.slug,
    icon: c.icon,
    count: 0,
    types: c.types,
    subcategories: c.types.map(ty => t(ty.nameKey)),
  }));
}
let categories = buildCategories();

const users = [
  { id:'u1', nameKey:'demo.user.u1', rating:4.8, listingsCount:12, memberSince:'2023-03-15', phone:'+992 91 123 45 67' },
  { id:'u2', nameKey:'demo.user.u2', rating:4.5, listingsCount:8, memberSince:'2023-06-20', phone:'+992 92 765 43 21' },
  { id:'u3', nameKey:'demo.user.u3', rating:4.9, listingsCount:25, memberSince:'2022-11-10', phone:'+992 93 111 22 33' },
  { id:'u4', nameKey:'demo.user.u4', rating:4.2, listingsCount:5, memberSince:'2024-01-05', phone:'+992 91 555 66 77' },
  { id:'u5', nameKey:'demo.user.u5', rating:4.7, listingsCount:18, memberSince:'2023-08-14', phone:'+992 92 888 99 00' },
];

const listings = [
  { id:'1', titleKey:'demo.listing.1.title', descKey:'demo.listing.1.desc', price:185000, currency:'somoni', category:'transport', type:'passenger-cars', brand:'Toyota', model:'Camry', locationKey:'city.dushanbe', author:users[1], createdAt:'2026-08-20T10:30:00Z', views:245, condition:'new', phone:'+992 92 765 43 21' },
  { id:'2', titleKey:'demo.listing.2.title', descKey:'demo.listing.2.desc', price:18500, currency:'somoni', category:'telefony', type:'smartphone', brand:'Apple', model:'iPhone 15 Pro', locationKey:'city.khujand', author:users[2], createdAt:'2026-08-19T14:20:00Z', views:189, condition:'new', phone:'+992 93 111 22 33' },
  { id:'3', titleKey:'demo.listing.3.title', descKey:'demo.listing.3.desc', price:450000, currency:'somoni', category:'khona', type:'apartment-sale', locationKey:'loc.dushanbe-center', author:users[3], createdAt:'2026-08-18T09:00:00Z', views:567, condition:'good', phone:'+992 91 555 66 77' },
  { id:'4', titleKey:'demo.listing.4.title', descKey:'demo.listing.4.desc', price:28000, currency:'somoni', category:'kompyuterho', type:'laptop', brand:'Apple', model:'MacBook Pro', locationKey:'city.dushanbe', author:users[4], createdAt:'2026-08-17T16:45:00Z', views:134, condition:'used', phone:'+992 92 888 99 00' },
  { id:'5', titleKey:'demo.listing.5.title', descKey:'demo.listing.5.desc', price:210000, currency:'somoni', category:'transport', type:'passenger-cars', brand:'Hyundai', model:'Tucson', locationKey:'city.bokhtar', author:users[1], createdAt:'2026-08-16T11:20:00Z', views:312, condition:'good', phone:'+992 92 765 43 21' },
  { id:'6', titleKey:'demo.listing.6.title', descKey:'demo.listing.6.desc', price:8500, currency:'somoni', category:'mebel', type:'sofa', locationKey:'city.dushanbe', author:users[2], createdAt:'2026-08-15T08:30:00Z', views:89, condition:'new', phone:'+992 93 111 22 33' },
  { id:'7', titleKey:'demo.listing.7.title', descKey:'demo.listing.7.desc', price:0, currency:'somoni', category:'kor', type:'it', locationKey:'city.dushanbe', author:users[3], createdAt:'2026-08-14T13:00:00Z', views:445, condition:'new', phone:'+992 91 555 66 77' },
  { id:'8', titleKey:'demo.listing.8.title', descKey:'demo.listing.8.desc', price:7200, currency:'somoni', category:'kompyuterho', type:'game-console', brand:'Sony', model:'PlayStation 5', locationKey:'city.kulob', author:users[4], createdAt:'2026-08-13T17:15:00Z', views:201, condition:'used', phone:'+992 92 888 99 00' },
  { id:'9', titleKey:'demo.listing.9.title', descKey:'demo.listing.9.desc', price:16500, currency:'somoni', category:'telefony', type:'smartphone', brand:'Samsung', model:'Galaxy S24', locationKey:'city.dushanbe', author:users[1], createdAt:'2026-08-12T10:00:00Z', views:178, condition:'new', phone:'+992 92 765 43 21' },
  { id:'10', titleKey:'demo.listing.10.title', descKey:'demo.listing.10.desc', price:280000, currency:'somoni', category:'khona', type:'apartment-sale', locationKey:'city.khujand', author:users[2], createdAt:'2026-08-11T09:30:00Z', views:234, condition:'good', phone:'+992 93 111 22 33' },
  { id:'11', titleKey:'demo.listing.11.title', descKey:'demo.listing.11.desc', price:1200, currency:'somoni', category:'libos', type:'men-clothing', locationKey:'city.dushanbe', author:users[3], createdAt:'2026-08-10T14:00:00Z', views:67, condition:'new', phone:'+992 91 555 66 77' },
  { id:'12', titleKey:'demo.listing.12.title', descKey:'demo.listing.12.desc', price:800, currency:'somoni', category:'hayvonot', type:'dogs', locationKey:'city.dushanbe', author:users[4], createdAt:'2026-08-09T11:00:00Z', views:156, condition:'new', phone:'+992 92 888 99 00' },
  { id:'13', titleKey:'demo.listing.13.title', descKey:'demo.listing.13.desc', price:4200, currency:'somoni', category:'kompyuterho', type:'laptop', brand:'Lenovo', model:'IdeaPad', locationKey:'city.dushanbe', author:users[2], createdAt:'2026-08-21T09:15:00Z', views:98, condition:'used', phone:'+992 93 111 22 33' },
  { id:'14', titleKey:'demo.listing.14.title', descKey:'demo.listing.14.desc', price:5800, currency:'somoni', category:'elektronika', type:'tv', brand:'Samsung', locationKey:'city.dushanbe', author:users[1], createdAt:'2026-08-20T15:00:00Z', views:71, condition:'new', phone:'+992 92 765 43 21' },
  { id:'15', titleKey:'demo.listing.15.title', descKey:'demo.listing.15.desc', price:3900, currency:'somoni', category:'elektronika', type:'washer', brand:'LG', locationKey:'city.khujand', author:users[3], createdAt:'2026-08-19T12:00:00Z', views:54, condition:'used', phone:'+992 91 555 66 77' },
  { id:'16', titleKey:'demo.listing.16.title', descKey:'demo.listing.16.desc', price:1600, currency:'somoni', category:'detskiy', type:'stroller', locationKey:'city.dushanbe', author:users[4], createdAt:'2026-08-18T10:00:00Z', views:43, condition:'good', phone:'+992 92 888 99 00' },
  { id:'17', titleKey:'demo.listing.17.title', descKey:'demo.listing.17.desc', price:4500, currency:'somoni', category:'stroitelstvo', type:'materials', locationKey:'city.bokhtar', author:users[2], createdAt:'2026-08-17T08:00:00Z', views:29, condition:'new', phone:'+992 93 111 22 33' },
  { id:'18', titleKey:'demo.listing.18.title', descKey:'demo.listing.18.desc', price:3200, currency:'somoni', category:'hobbi', type:'bicycle', brand:'Trek', model:'Marlin 7', locationKey:'city.dushanbe', author:users[1], createdAt:'2026-08-16T09:30:00Z', views:62, condition:'used', phone:'+992 92 765 43 21' },
  { id:'19', titleKey:'demo.listing.19.title', descKey:'demo.listing.19.desc', price:9500, currency:'somoni', category:'biznes', type:'office-furniture', locationKey:'city.dushanbe', author:users[3], createdAt:'2026-08-15T11:00:00Z', views:38, condition:'good', phone:'+992 91 555 66 77' },
  { id:'20', titleKey:'demo.listing.20.title', descKey:'demo.listing.20.desc', price:0, currency:'somoni', category:'darom', type:'darom-clothing', locationKey:'city.dushanbe', author:users[4], createdAt:'2026-08-14T16:00:00Z', views:112, condition:'good', phone:'+992 92 888 99 00' },
];

/* ---------------- Матни намоишӣ (тарҷумашаванда) ---------------- */
/* Ҳар яке аз функсияҳои поён ҳам бо маълумоти намунавӣ (…Key) ва ҳам бо
   эълонҳои воқеии корбар (матни озод) кор мекунад. */
function listingTitle(l) { return l.titleKey ? t(l.titleKey) : (l.title || ''); }
function listingDesc(l) { return l.descKey ? t(l.descKey) : (l.description || ''); }
function listingLocation(l) { return l.locationKey ? t(l.locationKey) : (l.location || ''); }
function listingCondition(l) { return condLabel(l.condition); }
function listingSubcategory(l) {
  const ty = getTypeEngine(l.category, l.type);
  return ty ? t(ty.nameKey) : (l.subcategory || '');
}
function userName(u) { return u ? (u.nameKey ? t(u.nameKey) : (u.name || '')) : ''; }

function condLabel(code) {
  if (!code) return '';
  const key = 'cond.' + code;
  return (window.I18N && window.I18N.has(key)) ? t(key) : String(code);
}
function cityLabel(code) {
  if (!code) return '';
  const key = String(code).indexOf('.') !== -1 ? code : 'city.' + code;
  return (window.I18N && window.I18N.has(key)) ? t(key) : String(code);
}

function formatPrice(price, currency) { return window.I18N.price(price, currency); }
function formatDate(dateStr) { return window.I18N.relTime(dateStr); }
function formatNumber(n) { return window.I18N.num(n); }
function formatPhone(phone) { return phone || ''; }

/* ---------------- Ҷустуҷӯ ва интихоб ---------------- */
function getCategoryBySlug(slug) { return categories.find(c => c.slug === slug); }
function getCategoryName(slug) {
  const c = CATEGORY_TREE.find(x => x.slug === slug);
  return c ? t(c.nameKey) : slug;
}
function getSubcategories(slug) {
  const c = CATEGORY_TREE.find(x => x.slug === slug);
  return c ? c.types.map(ty => t(ty.nameKey)) : [];
}

/* Шаҳрҳо — кодҳо, матн: city.<code> */
const cityCodes = ['dushanbe','khujand','bokhtar','kulob','istaravshan','panjakent','vahdat','tursunzoda','dangara','isfara','istiqlol','rogun'];
const cities = cityCodes;                     // (compat) — кодҳо
function cityOptions() { return cityCodes.map(c => ({ code: c, label: t('city.' + c) })); }

/* Ҳолати мол — кодҳо, матн: cond.<code> */
const conditionCodes = ['new','used','good'];
const conditions = conditionCodes;            // (compat)
function conditionOptions() { return conditionCodes.map(c => ({ code: c, label: t('cond.' + c) })); }

const catIcons = {};
CATEGORY_TREE.forEach(c => { catIcons[c.slug] = c.icon; });

const CAT_COLOR_PALETTE = [
  {bg:'#dbeafe',color:'#E35D28'}, {bg:'#d1fae5',color:'#2B4257'},
  {bg:'#ede9fe',color:'#7c3aed'}, {bg:'#fef3c7',color:'#b45309'},
  {bg:'#ffe4e6',color:'#be123c'}, {bg:'#cffafe',color:'#0e7490'},
  {bg:'#ffedd5',color:'#c2410c'}, {bg:'#f1f5f9',color:'#334155'},
];
const catColors = {};
CATEGORY_TREE.forEach((c, i) => { catColors[c.slug] = CAT_COLOR_PALETTE[i % CAT_COLOR_PALETTE.length]; });

function getListingsByCategory(slug) { return listings.filter(l => l.category === slug); }
function getListingById(id) { return listings.find(l => l.id === id); }

function searchListings(query) {
  const q = String(query || '').toLowerCase();
  return listings.filter(l =>
    listingTitle(l).toLowerCase().includes(q) ||
    listingDesc(l).toLowerCase().includes(q) ||
    listingLocation(l).toLowerCase().includes(q) ||
    String(l.brand || '').toLowerCase().includes(q) ||
    String(l.model || '').toLowerCase().includes(q));
}

const imgColors = ['#dbeafe','#d1fae5','#ede9fe','#fef3c7','#ffe4e6','#cffafe','#ffedd5','#f1f5f9'];

/* Ҳангоми иваз шудани забон — рӯйхати категорияҳоро аз нав месозем */
if (window.I18N) window.I18N.onChange(() => { categories = buildCategories(); });
