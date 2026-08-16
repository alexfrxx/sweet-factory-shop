import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getDesserts, getCategories } from './axios.js';
import { createDessertCardsMarkup, createCategoriesMarkup } from './render.js';

const dessertsList = document.querySelector('.js-desserts-list');
const loadMoreBtn = document.querySelector('.js-load-more');
const loader = document.querySelector('.js-loader');
const categoriesWrapper = document.querySelector('.js-categories-wrapper');

let currentPage = 1;
let currentCategory = 'all';
const LIMIT = 8;
let isLoading = false;

function toggleLoader(show) {
  if (!loader) return;
  if (show) {
    loader.classList.remove('loader-hidden');
  } else {
    loader.classList.add('loader-hidden');
  }
}

async function initDessertsSection() {
  try {
    const categories = await getCategories();

    if (categoriesWrapper) {
      categoriesWrapper.innerHTML = createCategoriesMarkup(categories);
      setupCategoryEventListeners();
    } else {
      console.error('Клас .js-categories-wrapper не знайдено в DOM');
    }

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', onLoadMoreClick);
    }

    await fetchAndRenderDesserts();
  } catch (error) {
    console.error('Initialization error:', error);
    showErrorMessage('Failed to load categories. Please try again later.');
  }
}

function setupCategoryEventListeners() {
  const categorySelect = document.querySelector('#category-select');
  const categoryList = document.querySelector('#category-list');

  // 1. Mobile & Tablet Event: Dropdown <select> change
  if (categorySelect) {
    categorySelect.addEventListener('change', onCategorySelectChange);
  }

  // 2. Desktop Event: Buttons <ul> click
  if (categoryList) {
    categoryList.addEventListener('click', onCategoryClick);
  }
}

/**
 * Handles category selection from Mobile/Tablet <select> dropdown
 */
async function onCategorySelectChange(event) {
  const selectedCategory = event.target.value;
  if (selectedCategory === currentCategory || isLoading) return;

  // Sync desktop active button
  const categoryList = document.querySelector('#category-list');
  if (categoryList) {
    const activeBtn = categoryList.querySelector('.category-btn.active');
    if (activeBtn) activeBtn.classList.remove('active');

    const targetBtn = categoryList.querySelector(
      `.category-btn[data-category="${selectedCategory}"]`
    );
    if (targetBtn) targetBtn.classList.add('active');
  }

  currentPage = 1;
  currentCategory = selectedCategory;

  await fetchAndRenderDesserts();
}

/**
 * Handles category selection from Desktop <ul> buttons list
 */
async function onCategoryClick(event) {
  const categoryBtn = event.target.closest('.category-btn');
  if (!categoryBtn || categoryBtn.classList.contains('active') || isLoading)
    return;

  const selectedCategory = categoryBtn.dataset.category;

  const categoryList = document.querySelector('#category-list');
  if (categoryList) {
    const activeBtn = categoryList.querySelector('.category-btn.active');
    if (activeBtn) activeBtn.classList.remove('active');
  }
  categoryBtn.classList.add('active');

  const categorySelect = document.querySelector('#category-select');
  if (categorySelect) {
    categorySelect.value = selectedCategory;
  }

  currentPage = 1;
  currentCategory = selectedCategory;

  await fetchAndRenderDesserts();
}

async function onLoadMoreClick() {
  if (isLoading) return;
  currentPage += 1;
  await fetchAndRenderDesserts();
  smoothScrollAfterLoad();
}

export async function fetchAndRenderDesserts() {
  if (isLoading) return;

  isLoading = true;
  toggleLoader(true);

  try {
    const data = await getDesserts(currentPage, LIMIT, currentCategory);
    const desserts = data.desserts || [];
    const totalItems = data.totalItems || 0;

    if (desserts.length === 0 && currentPage === 1) {
      if (dessertsList) {
        dessertsList.innerHTML =
          '<p class="no-desserts">На жаль, десертів у цій категорії не знайдено.</p>';
      }
      if (loadMoreBtn) loadMoreBtn.style.display = 'none';
      return;
    }

    const markup = createDessertCardsMarkup(desserts);

    if (dessertsList) {
      if (currentPage === 1) {
        dessertsList.innerHTML = markup;
      } else {
        dessertsList.insertAdjacentHTML('beforeend', markup);
      }
    }

    if (loadMoreBtn) {
      const totalPages = Math.ceil(totalItems / LIMIT);
      if (currentPage >= totalPages || desserts.length === 0) {
        loadMoreBtn.style.display = 'none';
      } else {
        loadMoreBtn.style.display = 'block';
      }
    }
  } catch (error) {
    console.error('Error loading desserts:', error);
    showErrorMessage('Server error. Failed to load desserts.');
  } finally {
    isLoading = false;
    toggleLoader(false);
  }
}

function showErrorMessage(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
    timeout: 4000,
    progressBar: true,
    transitionIn: 'fadeInDown',
  });
}

function smoothScrollAfterLoad() {
  const firstCard = dessertsList?.firstElementChild;
  if (!firstCard) return;

  const { height: cardHeight } = firstCard.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

initDessertsSection();
