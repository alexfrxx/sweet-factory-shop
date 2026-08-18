const burgerBtn = document.querySelector('.burger-btn');
const closeBtn = document.querySelector('.close-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuLinks = mobileMenu.querySelectorAll('a');

function openMenu() {
  mobileMenu.classList.add('is-open');
  burgerBtn.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  mobileMenu.classList.remove('is-open');
  burgerBtn.setAttribute('aria-expanded', 'false');
}

burgerBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);

mobileMenuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});