// Захираи маҳаллии браузер (localStorage) — то маълумот байни саҳифаҳо гум нашавад
const SK = { FAV: 'elontj_favorites', MINE: 'elontj_my_listings', SEEN: 'elontj_recently_viewed' };

function _get(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; }
}
function _set(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); return true; } catch (e) { return false; }
}

// ---- Дӯстдоштаҳо ----
function getFavorites() { return _get(SK.FAV, []); }
function isFavorite(id) { return getFavorites().includes(id); }
function toggleFavorite(id) {
  let favs = getFavorites();
  const active = favs.includes(id);
  favs = active ? favs.filter(x => x !== id) : [...favs, id];
  _set(SK.FAV, favs);
  return !active;
}

// ---- Эълонҳои корбар (гузошташуда тавассути post.html) ----
function getUserListings() { return _get(SK.MINE, []); }
function addUserListing(listing) {
  const all = getUserListings();
  all.unshift(listing);
  return _set(SK.MINE, all);
}
function deleteUserListing(id) {
  _set(SK.MINE, getUserListings().filter(l => l.id !== id));
}
function isUserListing(id) {
  return getUserListings().some(l => l.id === id);
}

// Ҳамаи эълонҳо (намунавӣ + эълонҳои корбар) якҷоя
function allListings() { return getUserListings().concat(listings); }
function findListing(id) { return allListings().find(l => l.id === id); }

// ---- Тамошои охирин ----
function addRecentlyViewed(id) {
  let arr = _get(SK.SEEN, []).filter(x => x !== id);
  arr.unshift(id);
  _set(SK.SEEN, arr.slice(0, 8));
}
function getRecentlyViewedListings() {
  const ids = _get(SK.SEEN, []);
  return ids.map(id => findListing(id)).filter(Boolean);
}

function nextListingId() {
  return 'u' + Date.now();
}

// ---- Эълонҳои марбут (categoriyai якхела) ----
function getRelatedListings(listing, max) {
  max = max || 4;
  return allListings()
    .filter(l => l.id !== listing.id && l.category === listing.category)
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, max);
}

// ---- Паёмҳо (муколамаҳо) — захира дар localStorage то гум нашаванд ----
function _genMsgId(){ return 'm'+Date.now()+Math.random().toString(36).substr(2,6); }

const DEFAULT_CONVERSATIONS = [
  { id:'c1', nameKey:'demo.user.u2', color1:'#E35D28', color2:'#2B4257', time:'15:30', unread:2, online:true,
    messages:[
      {id:'m1a', dir:'in', textKey:'demo.msg.c1.m1', time:'15:30'},
      {id:'m1b', dir:'out', textKey:'demo.msg.c1.m2', time:'15:35'},
      {id:'m1c', dir:'in', textKey:'demo.msg.c1.m3', time:'15:40'},
    ]},
  { id:'c2', nameKey:'demo.user.u3', color1:'#2B4257', color2:'#FBD8BE', time:'yesterday', unread:0, online:false,
    messages:[
      {id:'m2a', dir:'in', textKey:'demo.msg.c2.m1', timeKey:'demo.msg.c2.m1.time'},
    ]},
];

/* Матни намоишӣ: паёмҳои намунавӣ калид доранд, паёмҳои корбар — матни худаш */
function convName(c) { return c.nameKey ? t(c.nameKey) : (c.name || ''); }
function msgText(m) { return m.textKey ? t(m.textKey) : (m.text || ''); }
function msgTime(m) { return m.timeKey ? t(m.timeKey) : (m.time || ''); }
function convTime(c) { return c.timeKey ? t(c.timeKey) : (c.time === 'yesterday' ? t('time.yesterday') : (c.time || '')); }

function getConversations() {
  const stored = _get('elontj_conversations', null);
  return stored || DEFAULT_CONVERSATIONS;
}
function saveConversations(convs) {
  _set('elontj_conversations', convs);
}
function getUnreadCount() {
  return getConversations().reduce((sum, c) => sum + (c.unread || 0), 0);
}