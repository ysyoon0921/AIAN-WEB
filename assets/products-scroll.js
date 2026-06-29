/**
 * PRODUCTS — Axiom-style stacked reveal
 * Hold each product fully visible, then swap (no overlapping text).
 */
(function () {
  var section = document.getElementById('products');
  if (!section) return;

  var pin = section.querySelector('.products-pin');
  var track = section.querySelector('.products-track');
  var panels = section.querySelectorAll('.product-panel');
  var counterWrap = section.querySelector('.products-counter');
  var dotsWrap = section.querySelector('.products-dots');
  var count = panels.length;

  if (!pin || !track || count < 2) return;

  /* Scroll length per product step — higher = slower (0.7~1.2) */
  var STEP_RATIO = 0.92;

  /* Within each step: hold → exit → enter (no overlap) */
  var HOLD_END = 0.78;
  var EXIT_END = 0.9;

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

  function setSectionHeight() {
    if (mobile()) {
      section.style.height = '';
      return 0;
    }
    var pinH = pin.offsetHeight;
    var scrollRange = pinH * STEP_RATIO * (count - 1);
    section.style.height = Math.round(pinH + scrollRange) + 'px';
    return scrollRange;
  }

  function hidePanel(panel, offRight) {
    panel.style.opacity = '0';
    panel.style.visibility = 'hidden';
    panel.style.transform = offRight
      ? 'translate3d(32%, 0, 0) scale(0.98)'
      : 'translate3d(-12%, 0, 0) scale(0.98)';
    panel.style.zIndex = '1';
  }

  function showPanel(panel, x, opacity, scale, z) {
    panel.style.opacity = String(opacity);
    panel.style.visibility = opacity > 0.01 ? 'visible' : 'hidden';
    panel.style.transform = 'translate3d(' + x + '%, 0, 0) scale(' + scale + ')';
    panel.style.zIndex = String(z);
  }

  function setActive(index) {
    if (counter) counter.textContent = String(index + 1).padStart(2, '0');
    dots.forEach(function (dot, i) {
      dot.classList.toggle('on', i === index);
    });
    panels.forEach(function (p, i) {
      p.classList.toggle('is-active', i === index);
    });
  }

  function update() {
    if (mobile()) {
      panels.forEach(function (p) {
        p.style.transform = '';
        p.style.opacity = '';
        p.style.visibility = '';
        p.style.zIndex = '';
      });
      section.classList.remove('is-done');
      return;
    }

    var scrollRange = setSectionHeight();
    if (scrollRange <= 0) return;

    var rect = section.getBoundingClientRect();
    var progress = clamp(-rect.top / scrollRange, 0, 1);
    var pos = progress * (count - 1);
    var base = Math.min(count - 1, Math.floor(pos));
    var frac = pos - base;

    panels.forEach(function (panel, i) {
      if (i < base) {
        hidePanel(panel, false);
        return;
      }

      if (i > base + 1) {
        hidePanel(panel, true);
        return;
      }

      if (i === base) {
        if (frac <= HOLD_END || base === count - 1) {
          showPanel(panel, 0, 1, 1, 10);
        } else if (frac <= EXIT_END) {
          var t = (frac - HOLD_END) / (EXIT_END - HOLD_END);
          showPanel(panel, -t * 14, 1 - t, 1 - t * 0.02, 10);
        } else {
          hidePanel(panel, false);
        }
        return;
      }

      if (i === base + 1) {
        if (frac <= EXIT_END) {
          hidePanel(panel, true);
        } else {
          var t2 = (frac - EXIT_END) / (1 - EXIT_END);
          showPanel(panel, (1 - t2) * 36, t2, 0.98 + t2 * 0.02, 11);
        }
      }
    });

    var activeIndex = frac >= EXIT_END && base < count - 1 ? base + 1 : base;
    setActive(activeIndex);
    section.classList.toggle('is-done', progress >= 0.995);
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
})();
