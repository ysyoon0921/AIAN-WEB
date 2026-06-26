function setLang(lang){
  document.documentElement.lang = lang;
  const showKo = lang === 'ko';
  document.querySelectorAll('[data-ko]').forEach(el => el.style.display = showKo ? '' : 'none');
  document.querySelectorAll('[data-en]').forEach(el => el.style.display = showKo ? 'none' : '');
  document.getElementById('lang-ko').classList.toggle('on', showKo);
  document.getElementById('lang-en').classList.toggle('on', !showKo);
}
setLang('ko');

(function(){
  const nav = document.getElementById('nav');
  if(!nav) return;
  nav.classList.add('nav-light');
  nav.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('mouseenter', () => nav.classList.add('open'));
  });
  nav.addEventListener('mouseleave', () => nav.classList.remove('open'));
})();
