// Import SVG sprite via Vite
import spriteUrl from '../img/sprite.svg';

function createCardMarkup(dessert) {
  const { _id, name, category, description, price, image } = dessert;

  const categoryName = typeof category === 'object' ? category.name : category;

  return `
    <li class="desserts-item">
      <article class="dessert-card" data-id="${_id}">

        <div class="dessert-card-thumb">
          <img 
            class="dessert-card-img"
            src="${image}"
            alt="${name}"
            width="278" 
            height="209" 
            loading="lazy" 
          />
        </div>

        <div class="dessert-card-content">
        <div class="dessert-card-wrapper">
        <p class="dessert-card-category">${categoryName}</p>
        <h3 class="dessert-card-title">${name}</h3>
        <p class="dessert-card-description">${description}</p>
        </div>

          <div class="dessert-card-footer">
            <span class="dessert-card-price">${price} ₴</span>

            <button 
              class="dessert-card-btn btn js-open-modal" 
              type="button" 
              data-id="${_id}"
              aria-label="Order ${name} dessert"
            >
              <svg class="dessert-card-icon" width="24" height="24">
                 <use href="${spriteUrl}#arrow-up"></use>
              </svg>
            </button>
          </div>
        </div>

      </article>
    </li>
  `;
}

export function createDessertCardsMarkup(desserts = []) {
  return desserts.map(createCardMarkup).join('');
}

export function createCategoriesMarkup(categories = []) {
  // 1. Generate options for <select> element (Mobile & Tablet)
  const selectDefaultOption = `<option value="all" selected>Всі десерти</option>`;

  const selectOptions = categories
    .map(cat => {
      const categoryId = typeof cat === 'object' ? cat._id || cat.name : cat;
      const categoryName = typeof cat === 'object' ? cat.name : cat;

      return `<option value="${categoryId}">${categoryName}</option>`;
    })
    .join('');

  const selectMarkup = `
    <select class="category-select" id="category-select" aria-label="Select dessert category">
      ${selectDefaultOption}
      ${selectOptions}
    </select>
  `;

  // 2. Generate buttons for <ul> list (Desktop)
  const allCategoryBtn = `
    <li class="category-item">
      <button type="button" class="btn category-btn active" data-category="all">
        Всі десерти
      </button>
    </li>
  `;

  const categoriesBtns = categories
    .map(cat => {
      const categoryId = typeof cat === 'object' ? cat._id || cat.name : cat;
      const categoryName = typeof cat === 'object' ? cat.name : cat;

      return `
        <li class="category-item">
          <button type="button" class="category-btn" data-category="${categoryId}">
            ${categoryName}
          </button>
        </li>
      `;
    })
    .join('');

  const listMarkup = `
    <ul class="category-list" id="category-list">
      ${allCategoryBtn}
      ${categoriesBtns}
    </ul>
  `;

  // Return both markup elements to render in DOM
  return `${selectMarkup}${listMarkup}`;
}
