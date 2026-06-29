/**
 * PRODUCTS — Stacked cover (Axiom-style deck)
 * Card 1 stays centered; next card slides in from the right and covers it
 * while the covered card shrinks behind. Repeats for each product.
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

  /* Scroll length per card step — higher = slower */
  var STEP_RATIO = 0.9;
  /* How much a card shrinks per cover level */
  var SHRINK = 0.07;
  var MAX_DEPTH = 3;

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
  var lastActive = -1;

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

  function setSectionHeight() {
    var pinH = pin.offsetHeight;
    var scrollRange = pinH * STEP_RATIO * (count - 1);
    section.style.height = Math.round(pinH + scrollRange) + 'px';
    return scrollRange;
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
    var pos = progress * (count - 1);

    var stageW = right.clientWidth;
    var cardW = cards[0].offsetWidth || stageW;
    /* distance to push a card fully off the right edge */
    var offRight = stageW / 2 + cardW / 2 + 60;

    var base = Math.min(count - 1, Math.floor(pos));
    var frac = pos - base;

    cards.forEach(function (card, i) {
      var d = pos - i; // >0 covered/active, in (-1,0) entering, <=-1 waiting
      var x, scale = 1;

      if (d <= -1) {
        /* waiting off-screen to the right */
        x = offRight;
      } else if (d < 0) {
        /* entering from the right toward center */
        var enterT = d + 1; // 0 → 1
        x = offRight * (1 - enterT);
      } else {
        /* at center, being covered → shrink by depth */
        x = 0;
        scale = 1 - clamp(d, 0, MAX_DEPTH) * SHRINK;
      }

      card.style.transform =
        'translate3d(calc(-50% + ' + x.toFixed(1) + 'px), 0, 0) scale(' + scale.toFixed(4) + ')';
      card.style.zIndex = String(i + 1);
    });

    var activeIndex = frac > 0.5 ? Math.min(count - 1, base + 1) : base;
    setActive(activeIndex);
    section.classList.toggle('is-done', progress >= 0.995);
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
})();
