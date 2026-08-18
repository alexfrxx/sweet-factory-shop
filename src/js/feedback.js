import { getFeedbacks } from './axios.js';
import { createRatingMarkup } from './modal.js';

const feedbackList = document.querySelector('.feedback-list');

function renderFeedbacks(feedbacks) {
  const markup = feedbacks
    .map(({ rate, description, author }) => {
      return `
      <li class="swiper-slide feedback-item">

        <div class="feedback-rating">
        ${createRatingMarkup(rate)}
        </div>

          <p class="feedback-description">${description}</p>
          <p class="feedback-author">${author}</p>
          

      </li>
    `;
    })
    .join('');

  feedbackList.innerHTML = markup;

  createRatingMarkup();
}

async function initFeedback() {
  try {
    const data = await getFeedbacks();
    console.log(data);
    renderFeedbacks(data.feedbacks);
  } catch (error) {
    console.error(error);
  }
}

initFeedback();
