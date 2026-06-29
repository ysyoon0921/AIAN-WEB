/**
 * PRODUCTS — Axiom Observed Systems style
 * Continuous vertical scroll → horizontal translate + soft depth FX
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

  /* Higher = more scroll distance per card (smoother, slower) */
  var SCROLL_RATIO = 2.1;
  var FOCUS_INSET = 20;

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

  function smoothstep(t) {
    t = clamp(t, 0, 1);
    return t * t * (3 - 2 * t);
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

  function cardStep() {
    if (count < 2) return 0;
    var gap = cards[1].offsetLeft - cards[0].offsetLeft - cards[0].offsetWidth;
    return cards[0].offsetWidth + gap;
  }

  function focusXForIndex(index) {
    return cards[index].offsetLeft - FOCUS_INSET;
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

  function applyCardFx() {
    var viewRect = right.getBoundingClientRect();
    var focusPoint = viewRect.left + FOCUS_INSET;
    var step = cardStep() || viewRect.width;
    var activeIndex = 0;
    var bestFocus = -1;

    cards.forEach(function (card, i) {
      var rect = card.getBoundingClientRect();
      var edgeOffset = rect.left - focusPoint;
      var distNorm = edgeOffset / step;

      /* Gaussian-like focus — wide, soft falloff (no binary on/off) */
      var focus = Math.exp(-(distNorm * distNorm) * 0.72);
      focus = smoothstep(focus);

      var scale = 0.965 + focus * 0.035;
      var opacity = 0.72 + focus * 0.28;
      var rotate = distNorm * -1.1 * (1 - focus);
      var blur = (1 - focus) * 0.55;

      card.style.transform =
        'scale(' + scale.toFixed(4) + ') rotate(' + rotate.toFixed(3) + 'deg)';
      card.style.opacity = opacity.toFixed(3);
      card.style.filter = blur > 0.08 ? 'blur(' + blur.toFixed(2) + 'px)' : '';

      if (focus > bestFocus) {
        bestFocus = focus;
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
    applyCardFx();
    section.classList.toggle('is-done', progress >= 0.995);
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
})();
