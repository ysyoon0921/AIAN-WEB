/**
 * PRODUCTS — Axiom-style stacked reveal
 * Scroll down: next product slides in from the right, current fades back.
 * Section height is set in JS so the last panel ends without extra dead scroll.
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

  /* Shorter scroll per product — tweak 0.45~0.65 (lower = faster handoff) */
  var STEP_RATIO = 0.52;

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
        p.style.zIndex = '';
      });
      section.classList.remove('is-done');
      return;
    }

    var scrollRange = setSectionHeight();
    if (scrollRange <= 0) return;

    var rect = section.getBoundingClientRect();
    var progress = Math.min(1, Math.max(0, -rect.top / scrollRange));
    var pos = progress * (count - 1);

    panels.forEach(function (panel, i) {
      var delta = i - pos;

      if (delta >= 0) {
        /* Upcoming panels — enter from the right (behind) */
        var enter = Math.min(delta, 1);
        var x = enter * 55;
        var scale = 1 - enter * 0.05;
        var opacity = 1 - enter * 0.55;
        panel.style.transform = 'translate3d(' + x + '%, 0, 0) scale(' + scale + ')';
        panel.style.opacity = String(Math.max(0.12, opacity));
        panel.style.zIndex = String(count - i);
      } else {
        /* Passed panels — drift left and fade */
        var leave = Math.min(-delta, 1);
        var x = delta * 18;
        var scale = 1 - leave * 0.04;
        var opacity = 1 - leave * 0.9;
        panel.style.transform = 'translate3d(' + x + '%, 0, 0) scale(' + scale + ')';
        panel.style.opacity = String(Math.max(0, opacity));
        panel.style.zIndex = String(count + i);
      }
    });

    var index = Math.min(count - 1, Math.max(0, Math.round(pos)));
    setActive(index);
    section.classList.toggle('is-done', progress >= 0.995);
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
})();
