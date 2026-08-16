import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const aboutUsSwiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination],

  slidesPerView: 2,
  spaceBetween: 24,
  loop: true,
  direction: 'horizontal',

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    768: {
      enabled: true,
    },
  },
});
