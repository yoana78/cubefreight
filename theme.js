/* CubeFreight 블랙톤 레이아웃 보조 (2026-10-01) — 빌드가 cubefreight/theme.js로 복사해 모든 페이지에 연결.
   계산 로직은 건드리지 않고 '배치'만 바꾼다. 요소의 id는 그대로라 계산기 스크립트는 영향 없음.
   1) 페이지 아래 설명(SEO 글 · 퍼가기)을 허브처럼 접기(▸ 누르면 펼침)
   2) 카톤 · 팔레트 입력 화면: 섹션(00 · 01 · 02 …)을 카드처럼 묶어 넓은 화면에 여러 칸으로 배치 */
(function () {
  var lang = (document.documentElement.lang || 'en').slice(0, 2);
  var MORE = { en: 'More about this calculator', ko: '계산기 자세히 보기', zh: '了解更多', es: 'Más sobre esta calculadora' };
  var EMBED = { en: 'Embed this calculator', ko: '이 계산기 내 사이트에 넣기', zh: '嵌入此计算器', es: 'Inserta esta calculadora' };

  function fold(el, label) {
    if (!el || el.closest('details.more')) return;
    var d = document.createElement('details');
    d.className = 'more';
    var s = document.createElement('summary');
    s.textContent = label;
    el.parentNode.insertBefore(d, el);
    d.appendChild(s);
    d.appendChild(el);
  }

  // 카톤 · 팔레트: .input-card 안의 [섹션 제목 + 그 아래 줄들]을 .cf-group으로 묶는다
  function groupForm() {
    var cards = document.querySelectorAll('.input-card');
    for (var c = 0; c < cards.length; c++) {
      var card = cards[c];
      if (card.getAttribute('data-cf-grouped')) continue;
      var titles = [];
      for (var k = 0; k < card.children.length; k++) {
        if (card.children[k].classList.contains('form-group-title')) titles.push(card.children[k]);
      }
      if (!titles.length) continue;
      var grid = document.createElement('div');
      grid.className = 'cf-groups cf-groups-' + titles.length;
      card.insertBefore(grid, titles[0]);
      for (var t = 0; t < titles.length; t++) {
        var g = document.createElement('div');
        g.className = 'cf-group';
        var n = titles[t].nextElementSibling;
        g.appendChild(titles[t]);
        while (n && !n.classList.contains('form-group-title') && !n.classList.contains('card-footer')) {
          var next = n.nextElementSibling;
          g.appendChild(n);
          n = next;
        }
        grid.appendChild(g);
      }
      card.setAttribute('data-cf-grouped', '1');
      document.documentElement.classList.add('cf-wide-form');
    }
  }

  // LTL: 위쪽의 큰 소개(배지 · 제목 · 설명)를 팔레트 · 카톤처럼 입력 카드 맨 위 머리말로 옮긴다 (id 유지 → 언어 전환 그대로 동작)
  function ltlHeader() {
    var hero = document.querySelector('.container > .hero');
    var card = document.querySelector('#stepInput > .card');
    if (!hero || !card || card.querySelector('.cf-card-header')) return;
    var head = document.createElement('div');
    head.className = 'cf-card-header';
    ['txtHeroH', 'txtHeroP', 'txtBadge2025'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) head.appendChild(el);
    });
    card.insertBefore(head, card.firstChild);
    hero.style.display = 'none';
  }

  function run() {
    ltlHeader();
    groupForm();
    fold(document.getElementById('seoContent'), MORE[lang] || MORE.en);           // 카톤 · 팔레트 · LTL
    fold(document.querySelector('main > section.seo'), MORE[lang] || MORE.en);   // 부피무게 · CBM
    fold(document.getElementById('embedSection'), EMBED[lang] || EMBED.en);      // LTL 퍼가기
    if (document.querySelector('main > .card#inputCard')) document.documentElement.classList.add('cf-tool');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
