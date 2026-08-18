import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const aboutUsSwiper = new Swiper('.about-swiper', {
  modules: [Navigation, Pagination],

  enabled: false,
  loop: true,
  direction: 'horizontal',

  pagination: {
    el: '.about-section .swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.about-button-next',
    prevEl: '.about-button-prev',
  },

  breakpoints: {
    768: {
      enabled: true,
      slidesPerView: 2,
      spaceBetween: 24,
    },
  },
});

const feedbackSwiper = new Swiper('.feedback-swiper', {
  modules: [Navigation, Pagination],

  slidesPerView: 1,
  spaceBetween: 24,
  loop: true,
  direction: 'horizontal',

  pagination: {
    el: '.feedback .swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.feedback-button-next',
    prevEl: '.feedback-button-prev',
  },

  breakpoints: {
    768: {
      slidesPerView: 3,
    },
  },
});
