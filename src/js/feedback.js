import { getFeedbacks } from './axios.js';

const feedbackList = document.querySelector('.feedback-list');

function createStars(rate) {
  const rating = Number(rate);
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return Array.from({ length: 5 }, (_, index) => {
    if (index < fullStars) {
      return `<i class="star-icon filled">★</i>`;
    }

    if (index === fullStars && hasHalfStar) {
      return `<i class="star-icon half">★</i>`;
    }

    return `<i class="star-icon">★</i>`;
  }).join('');
}

function renderFeedbacks(feedbacks) {
  const markup = feedbacks
    .map(feedback => {
      return `
      <li class="feedback-item">

        <div class="feedback-rating">
  ${createStars(feedback.rate)}
        </div>

          <p class="feedback-description">${feedback.description}</p>
          <p class="feedback-author">${feedback.author}</p>
          

      </li>
    `;
    })
    .join('');

  feedbackList.innerHTML = markup;
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
