import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const ORDERS_URL = 'https://deserts-store.b.goit.study/api/orders';

const modal = document.getElementById('modal-form');
const form = modal?.querySelector('.modal-form__form');

const openModal = () => {
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
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
    if (opener.dataset.dessertId) modal.dataset.dessertId = opener.dataset.dessertId;
    openModal();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !modal.hidden) closeModal();
});

form?.addEventListener('submit', async event => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const submitButton = form.querySelector('.modal-form__submit');
  const payload = {
    name: form.name.value.trim(),
    phone: form.phone.value.replace(/\D/g, ''),
    dessertId: modal.dataset.dessertId ?? null,
    comment: form.comment.value.trim(),
  };

  submitButton.disabled = true;

  try {
    const response = await fetch(ORDERS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const body = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(body?.message || 'Не вдалося оформити замовлення');
    }

    iziToast.success({
      title: 'Готово',
      message: `Замовлення №${body.orderNum} на "${body.dessertName}" успішно оформлено!`,
    });
    form.reset();
    closeModal();
  } catch (error) {
    iziToast.error({ title: 'Помилка', message: error.message });
  } finally {
    submitButton.disabled = false;
  }
});
