// CubeFreight 404 동작 (yoana.me/404.js와 같음 + 한국어 브라우저면 한국어 안내)
(function () {
  var p = location.pathname + location.search;
  try { p = decodeURIComponent(p); } catch (e) {}
  if (p.length > 60) p = p.slice(0, 57) + '...';
  document.getElementById('cmd').textContent = p;
  document.getElementById('path').textContent = p;
  if ((navigator.language || '').toLowerCase().indexOf('ko') === 0) {
    document.documentElement.lang = 'ko';
    document.getElementById('msg').textContent = '여긴 아무것도 없어요… 저도 길을 잃었어요 🤔';
    document.getElementById('hint').textContent = '← 아무 키나 누르면 홈으로';
  }
  var home = function () { location.href = '/'; };
  addEventListener('keydown', function (e) { if (!e.ctrlKey && !e.metaKey && !e.altKey) home(); });
  document.body.addEventListener('click', function (e) { if (!e.target.closest('a')) home(); });
})();
