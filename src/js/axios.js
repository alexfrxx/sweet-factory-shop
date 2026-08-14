import axios from 'axios';

// Створюємо екземпляр axios із базовою URL-адресою
const api = axios.create({
  baseURL: 'https://deserts-store.b.goit.study/api',
});

/**
 * Отримання списку категорій для фільтрів
 * GET /categories
 */
export async function getCategories() {
  const response = await api.get('/categories');
  return response.data;
}

/**
 * Отримання списку десертів (з пагінацією та фільтрацією)
 * GET /deserts?page=1&limit=8&category=...
 */
export async function getDesserts(page = 1, limit = 8, category = '') {
  const params = {
    page,
    limit,
  };

  // Якщо категорія обрана і це не "all" / "всі", додаємо параметр у запит
  if (category && category !== 'all') {
    params.category = category;
  }

  const response = await api.get('/desserts', { params });
  return response.data;
}

/**
 * Отримання одного десерту за ID (для модального вікна)
 * GET /deserts/{id}
 */
export async function getDessertById(id) {
  const response = await api.get(`/desserts/${id}`);
  return response.data;
}