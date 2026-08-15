import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

new Accordion('.faq__list', {
  duration: 300,
  showMultiple: false,
  openOnInit: [0],
  elementClass: 'ac',
  triggerClass: 'ac-trigger',
  panelClass: 'ac-panel',
  activeClass: 'is-active',
  beforeOpen: currentElement => {
    const items = document.querySelectorAll('.faq__item');
    items.forEach(item => {
      if (item !== currentElement) {
        item.classList.remove('is-active');
      }
    });
  },
});
