/**
 * PRODUCTS — Axiom Observed Systems style
 * Vertical scroll → horizontal translate, overlapping cards, no fade
 */
(function () {
  var section = document.getElementById('products');
  if (!section) return;

  var pin = section.querySelector('.products-pin');
  var right = section.querySelector('.products-right');
  var track = section.querySelector('.products-track');
  var cards = section.querySelectorAll('.product-card');
  var counterWrap = section.querySelector('.products-counter');
  var dotsWrap = section.querySelector('.products-dots');
  var count = cards.length;

  if (!pin || !right || !track || count < 2) return;

  var SCROLL_RATIO = 2.1;

  if (counterWrap) {
    counterWrap.innerHTML = '<span class="cur">01</span> / ' + String(count).padStart(2, '0');
  }
  if (dotsWrap) {
    dotsWrap.innerHTML = '';
    for (var d = 0; d < count; d++) {
      var dot = document.createElement('i');
      if (d === 0) dot.className = 'on';
      dotsWrap.appendChild(dot);
    }
  }

  var counter = counterWrap && counterWrap.querySelector('.cur');
  var dots = section.querySelectorAll('.products-dots i');
  var lastActive = 0;

  function mobile() {
    return window.matchMedia('(max-width: 900px)').matches;
  }

  function clamp(v, min, max) {
    return Math.min(max, Math.max(min, v));
  }

  function resetCards() {
    track.style.transform = '';
    cards.forEach(function (card) {
      card.style.transform = '';
      card.style.opacity = '';
      card.style.filter = '';
      card.style.zIndex = '';
      card.classList.remove('is-active');
    });
    section.style.height = '';
    section.classList.remove('is-done');
  }

  function setActive(index) {
    if (index === lastActive) return;
    lastActive = index;
    if (counter) counter.textContent = String(index + 1).padStart(2, '0');
    dots.forEach(function (dot, i) {
      dot.classList.toggle('on', i === index);
    });
    cards.forEach(function (card, i) {
      card.classList.toggle('is-active', i === index);
    });
  }

  function viewCenterX() {
    var rect = right.getBoundingClientRect();
    return rect.left + rect.width * 0.5;
  }

  function focusXForIndex(index) {
    var card = cards[index];
    var cardCenter = card.offsetLeft + card.offsetWidth * 0.5;
    var panelCenter = right.clientWidth * 0.5;
    return cardCenter - panelCenter;
  }

  function getScrollRange() {
    if (count < 2) return 0;
    return (focusXForIndex(count - 1) - focusXForIndex(0)) * SCROLL_RATIO;
  }

  function setSectionHeight() {
    var pinH = pin.offsetHeight;
    var scrollRange = getScrollRange();
    section.style.height = Math.round(pinH + scrollRange) + 'px';
    return scrollRange;
  }

  /* Z-index only — center card on top, no fade/blur/scale */
  function updateStacking() {
    var center = viewCenterX();
    var activeIndex = 0;
    var minDist = Infinity;

    cards.forEach(function (card, i) {
      var rect = card.getBoundingClientRect();
      var cardCenter = rect.left + rect.width * 0.5;
      var dist = Math.abs(cardCenter - center);

      card.style.transform = '';
      card.style.opacity = '';
      card.style.filter = '';
      card.style.zIndex = String(100 - Math.round(dist));

      if (dist < minDist) {
        minDist = dist;
        activeIndex = i;
      }
    });

    setActive(activeIndex);
  }

  function update() {
    if (mobile()) {
      resetCards();
      lastActive = -1;
      setActive(0);
      return;
    }

    var scrollRange = setSectionHeight();
    if (scrollRange <= 0) return;

    var rect = section.getBoundingClientRect();
    var progress = clamp(-rect.top / scrollRange, 0, 1);

    var startX = focusXForIndex(0);
    var endX = focusXForIndex(count - 1);
    var x = startX + progress * (endX - startX);

    track.style.transform = 'translate3d(-' + x.toFixed(2) + 'px, 0, 0)';
    updateStacking();
    section.classList.toggle('is-done', progress >= 0.995);
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
})();
