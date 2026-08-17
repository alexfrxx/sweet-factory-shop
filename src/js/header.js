const burgerBtn = document.querySelector('.burger-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.querySelector('.close-btn');

function openMenu() {
    mobileMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
}

burgerBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closeMenu();
    }
});

const mobileLinks = document.querySelectorAll('.mobile-menu a');

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});