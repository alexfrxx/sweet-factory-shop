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
    el: '.swiper-pagination',
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
