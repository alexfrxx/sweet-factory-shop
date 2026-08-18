const burger = document.querySelector('.mobile-menu');
const burgerBtn = document.querySelector('.burger-btn');
const closeBtn = document.querySelector('.close-btn');
const orderBtn = document.querySelector('.header-btn');

burgerBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);

burger.addEventListener('click', e => {
  if (e.target.classList.contains('header-link')) closeMenu();

  if (e.target.classList.contains('header-btn')) closeMenu();
});

document.addEventListener('keydown', onEscapeClick);

function onEscapeClick(e) {
  if (e.key === 'Escape') {
    closeMenu();
  }
}

function openMenu() {
  burger.classList.add('is-open');
  burgerBtn.setAttribute('aria-expanded', 'true');
  document.body.classList.add('no-scroll');
}

function closeMenu() {
  burger.classList.remove('is-open');
  burgerBtn.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('no-scroll');
}
