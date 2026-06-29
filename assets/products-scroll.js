/**
 * PRODUCTS — Axiom Observed Systems style
 * Vertical scroll → horizontal translate + per-card depth FX
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

  /* Extra scroll distance multiplier (higher = slower horizontal move) */
  var SCROLL_RATIO = 1.35;

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
      card.classList.remove('is-active');
    });
    section.style.height = '';
    section.classList.remove('is-done');
  }

  function setActive(index) {
    if (counter) counter.textContent = String(index + 1).padStart(2, '0');
    dots.forEach(function (dot, i) {
      dot.classList.toggle('on', i === index);
    });
    cards.forEach(function (card, i) {
      card.classList.toggle('is-active', i === index);
    });
  }

  function getMaxMove() {
    return Math.max(0, track.scrollWidth - right.clientWidth);
  }

  function setSectionHeight(maxMove) {
    var pinH = pin.offsetHeight;
    var scrollRange = maxMove * SCROLL_RATIO;
    section.style.height = Math.round(pinH + scrollRange) + 'px';
    return scrollRange;
  }

  function applyCardFx() {
    var viewRect = right.getBoundingClientRect();
    var viewCenter = viewRect.left + viewRect.width * 0.5;
    var viewW = viewRect.width;
    var activeIndex = 0;
    var minDist = Infinity;

    cards.forEach(function (card, i) {
      var rect = card.getBoundingClientRect();
      var cardCenter = rect.left + rect.width * 0.5;
      var offset = cardCenter - viewCenter;
      var norm = clamp(offset / (viewW * 0.55), -1.2, 1.2);
      var abs = Math.abs(norm);

      var scale = 1 - abs * 0.05;
      var opacity = 1 - abs * 0.42;
      var rotate = norm * -2;
      var blur = abs * 1.8;

      card.style.transform = 'scale(' + scale.toFixed(3) + ') rotate(' + rotate.toFixed(2) + 'deg)';
      card.style.opacity = String(clamp(opacity, 0.35, 1));
      card.style.filter = blur > 0.15 ? 'blur(' + blur.toFixed(2) + 'px)' : '';

      var dist = Math.abs(offset);
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
      setActive(0);
      return;
    }

    var maxMove = getMaxMove();
    var scrollRange = setSectionHeight(maxMove);
    if (scrollRange <= 0) return;

    var rect = section.getBoundingClientRect();
    var progress = clamp(-rect.top / scrollRange, 0, 1);
    var x = progress * maxMove;

    track.style.transform = 'translate3d(-' + x.toFixed(2) + 'px, 0, 0)';
    applyCardFx();
    section.classList.toggle('is-done', progress >= 0.995);
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
})();
