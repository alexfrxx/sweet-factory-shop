'use strict';

import { getBestsellers } from './axios';
import spriteUrl from '../img/sprite.svg';
import { bestsellersSwiper } from './swiper';
import { onOpenModal } from './modal';

const list = document.querySelector('.bestsellers-list');
list.addEventListener('click', onOpenModal);

async function getData() {
  try {
    const data = await getBestsellers();
    createMarkup(data.desserts);
  } catch (error) {
    console.log(error.message);
  }
}

function createMarkup(arr) {
  const markup = arr
    .map(({ _id, image, name, categoryName, description, price }) => {
      return `
    <li class="desserts-item swiper-slide">
          <article class="dessert-card bestsellers-card" data-id="${_id}">
    
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
    })
    .join('');

  list.innerHTML = markup;
  bestsellersSwiper.update();
}

getData();
