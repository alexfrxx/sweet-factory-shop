import { getFeedbacks } from './axios';

async function initFeedback() {
  const data = await getFeedbacks();

  const feedbacks = data.feedbacks.map(feedback => {
    return `
      <li class="swiper-slide">
        ${feedback.author}
        ${feedback.rate}
        ${feedback.description}
      </li>
    `;
  });

  const swiperWrapper = document.querySelector('.swiper-wrapper');
  swiperWrapper.innerHTML = feedbacks.join('');
}

initFeedback();