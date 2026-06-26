function setLang(lang){
  document.documentElement.lang = lang;
  const showKo = lang === 'ko';
  document.querySelectorAll('[data-ko]').forEach(el => el.style.display = showKo ? '' : 'none');
  document.querySelectorAll('[data-en]').forEach(el => el.style.display = showKo ? 'none' : '');
  document.getElementById('lang-ko').classList.toggle('on', showKo);
  document.getElementById('lang-en').classList.toggle('on', !showKo);
}
setLang('ko');
