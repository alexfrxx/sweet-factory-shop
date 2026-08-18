import { getDessertById } from './axios.js';
import spriteUrl from '../img/sprite.svg';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dessertsList = document.querySelector('.js-desserts-list');

const modalImg = document.querySelector('.desserts-modal-img');
const modalTitle = document.querySelector('.desserts-modal-title');
const modalPrice = document.querySelector('.desserts-modal-price');
const modalRating = document.querySelector('.modal-wrap-rating');
const modalDescr = document.querySelector('.desserts-modal-descr');
const modalIngredients = document.querySelector('.desserts-modal-ingredients');

const modal = document.querySelector('#desserts-modal');

const closeModalBtn = modal.querySelector('[data-modal-close]');
const orderBtn = modal.querySelector('.desserts-modal-btn');

const loader = document.querySelector('.js-loader');

function toggleLoader(show) {
  if (!loader) return;

  if (show) {
    loader.classList.remove('loader-hidden');
  } else {
    loader.classList.add('loader-hidden');
  }
}

dessertsList.addEventListener('click', onOpenModal);

async function onOpenModal(event) {
  const btn = event.target.closest('.js-open-modal');

  if (!btn) return;

  const id = btn.dataset.id;

  loader.classList.add('modal-loader');
  toggleLoader(true);

  try {
    const dessert = await getDessertById(id);

    modalImg.src = dessert.image;
    modalImg.alt = dessert.name;
    modalTitle.textContent = dessert.name;
    modalPrice.textContent = `${dessert.price} ₴`;
    modalDescr.textContent = dessert.description;

    modalIngredients.innerHTML = `<span>Склад</span>: ${dessert.composition}`;

    modalRating.innerHTML = createRatingMarkup(dessert.rate);

    orderBtn.dataset.dessertId = dessert._id;

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  } catch (error) {
    console.error('Error loading dessert:', error);

    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити інформацію про десерт.',
      position: 'topRight',
      timeout: 4000,
    });
  } finally {
    toggleLoader(false);
    loader.classList.remove('modal-loader');
  }
}

////////// RATING
export function createRatingMarkup(rate) {
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 !== 0;

  let markup = '';

  for (let i = 0; i < 5; i++) {
    let starType = 'star-empty';

    if (i < fullStars) {
      starType = 'star';
    } else if (i === fullStars && hasHalfStar) {
      starType = 'star-half';
    }

    markup += `
      <svg class="rating-star-svg" width="16" height="16">
        <use href="${spriteUrl}#${starType}"></use>
      </svg>
    `;
  }

  return markup;
}

// ////////////////////EXIT FROM FORM
closeModalBtn.addEventListener('click', onCloseModal);
modal.addEventListener('click', onBackdropClick);
document.addEventListener('keydown', onEscapePress);

function onCloseModal() {
  modal.hidden = true;
  document.body.style.overflow = '';
}

function onBackdropClick(event) {
  if (event.target === modal) {
    onCloseModal();
  }
}

function onEscapePress(event) {
  if (event.key === 'Escape' && modal && !modal.hidden) {
    onCloseModal();
  }
}

orderBtn.addEventListener('click', onOrderClick);

function onOrderClick() {
  onCloseModal();
}
