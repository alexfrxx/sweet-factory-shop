import axios from 'axios';

const api = axios.create({
  baseURL: 'https://deserts-store.b.goit.study/api',
});

export async function getCategories() {
  const response = await api.get('/categories');
  return response.data;
}

export async function getDesserts(page = 1, limit = 8, category = '') {
  const params = {
    page,
    limit,
  };

  if (category && category !== 'all') {
    params.category = category;
  }

  const response = await api.get('/desserts', { params });
  return response.data;
}

export async function getDessertById(id) {
  const response = await api.get(`/desserts/${id}`);
  return response.data;
}

export async function getFeedbacks(limit = 6, page = 1) {
  const response = await api.get('/feedbacks', {
    params: {
      limit,
      page,
    },
  });

  return response.data;
}
