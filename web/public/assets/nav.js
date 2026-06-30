(function(){
  const nav = document.getElementById('nav');
  if(!nav) return;

  const light = nav.dataset.theme === 'light';
  if(light) nav.classList.add('nav-light');

  if(!light){
    addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40));
  }

  nav.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('mouseenter', () => nav.classList.add('open'));
  });
  nav.addEventListener('mouseleave', () => nav.classList.remove('open'));

  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => nav.classList.remove('open'));
  });
})();
