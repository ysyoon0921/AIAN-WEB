/**
 * PRODUCTS horizontal scroll — Axiom-style
 * Edit --panel-count in CSS or change panel count here.
 * Each .product-panel in HTML = one slide.
 */
(function () {
  var section = document.getElementById('products');
  if (!section) return;

  var track = section.querySelector('.products-track');
  var panels = section.querySelectorAll('.product-panel');
  var counter = section.querySelector('.products-counter .cur');
  var counterWrap = section.querySelector('.products-counter');
  var dotsWrap = section.querySelector('.products-dots');
  var count = panels.length;

  if (!track || count < 2) return;

  section.style.setProperty('--panel-count', String(count));

  if (counterWrap) {
    counterWrap.innerHTML = '<span class="cur">01</span> / ' + String(count).padStart(2, '0');
    counter = counterWrap.querySelector('.cur');
  }
  if (dotsWrap) {
    dotsWrap.innerHTML = '';
    for (var d = 0; d < count; d++) {
      var dot = document.createElement('i');
      if (d === 0) dot.className = 'on';
      dotsWrap.appendChild(dot);
    }
  }
  var dots = section.querySelectorAll('.products-dots i');

  var mobile = function () {
    return window.matchMedia('(max-width: 900px)').matches;
  };

  function setActive(index) {
    if (counter) counter.textContent = String(index + 1).padStart(2, '0');
    dots.forEach(function (dot, i) {
      dot.classList.toggle('on', i === index);
    });
  }

  function update() {
    if (mobile()) {
      track.style.transform = '';
      section.classList.remove('is-done');
      return;
    }

    var rect = section.getBoundingClientRect();
    var scrollable = section.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;

    var progress = Math.min(1, Math.max(0, -rect.top / scrollable));
    var viewport = section.querySelector('.products-viewport');
    var w = viewport ? viewport.offsetWidth : window.innerWidth;
    var offset = progress * (count - 1) * w;

    track.style.transform = 'translate3d(' + (-offset) + 'px, 0, 0)';

    var index = Math.round(progress * (count - 1));
    setActive(index);
    section.classList.toggle('is-done', progress >= 0.98);
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
})();
