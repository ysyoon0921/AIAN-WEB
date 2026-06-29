/**
 * PRODUCTS — Axiom Observed Systems stack
 * Start: card 1 left + card 2 overlapping on top from right
 * Scroll: deck slides left, each next card stacks over the previous
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

  var SCROLL_RATIO = 2.0;
  var FOCUS_PAD = 28;

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

  function focusXForIndex(index) {
    return cards[index].offsetLeft - FOCUS_PAD;
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

  function updateActive() {
    var focusLine = right.getBoundingClientRect().left + FOCUS_PAD;
    var activeIndex = 0;
    var minDist = Infinity;

    cards.forEach(function (card, i) {
      var dist = Math.abs(card.getBoundingClientRect().left - focusLine);
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
    updateActive();
    section.classList.toggle('is-done', progress >= 0.995);
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
})();
