import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const ORDERS_URL = 'https://deserts-store.b.goit.study/api/orders';

const modal = document.getElementById('modal-form');
const form = modal?.querySelector('.modal-form-form');

const openModal = () => {
  if (!modal) return;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = '';
};

document.addEventListener('click', event => {
  if (event.target.closest('#modal-form [data-modal-close]')) {
    closeModal();
    return;
  }

  const opener = event.target.closest('[data-modal-target="modal-form"]');
  if (opener) {
    if (opener.dataset.dessertId)
      modal.dataset.dessertId = opener.dataset.dessertId;
    openModal();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal && !modal.hidden) closeModal();
});

const fields = form
  ? [...form.querySelectorAll('.modal-form-input, .modal-form-textarea')]
  : [];

const PHONE_REGEX = /^380\d{9}$/;

const getErrorMessage = field => {
  if (field.validity.valueMissing) return 'Заповніть це поле';
  if (
    field.type === 'tel' &&
    !PHONE_REGEX.test(field.value.replace(/\D/g, ''))
  ) {
    return field.title || 'Невірний формат';
  }
  return '';
};

const setFieldError = (field, message) => {
  field.classList.toggle('is-invalid', Boolean(message));
  const errorEl = field.parentElement.querySelector('.modal-form-error');
  if (errorEl) errorEl.textContent = message;
};

const validateField = field => {
  const message = getErrorMessage(field);
  setFieldError(field, message);
  return !message;
};

fields.forEach(field => {
  field.addEventListener('input', () => validateField(field));
});

form?.addEventListener('submit', async event => {
  event.preventDefault();

  const isValid = fields.map(validateField).every(Boolean);
  if (!isValid) {
    fields.find(field => getErrorMessage(field))?.focus();
    return;
  }

  const submitButton = form.querySelector('.modal-form-submit');
  const payload = {
    name: form.name.value.trim(),
    phone: form.phone.value.replace(/\D/g, ''),
    dessertId: modal.dataset.dessertId ?? null,
    comment: form.comment.value.trim(),
  };

  submitButton.disabled = true;

  try {
    const { data } = await axios.post(ORDERS_URL, payload);

    iziToast.success({
      title: 'Готово',
      message: `Замовлення №${data.orderNum} на "${data.dessertName}" успішно оформлено!`,
    });
    form.reset();
    fields.forEach(field => setFieldError(field, ''));
    closeModal();
  } catch (error) {
    const message =
      error.response?.data?.message || 'Не вдалося оформити замовлення';
    iziToast.error({ title: 'Помилка', message });
  } finally {
    submitButton.disabled = false;
  }
});
