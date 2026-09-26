import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const categoryAPI = {
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`),
}

export const warehouseAPI = {
  getAll: () => api.get('/warehouses'),
  getById: (id) => api.get(`/warehouses/${id}`),
  create: (data) => api.post('/warehouses', data),
  update: (id, data) => api.put(`/warehouses/${id}`, data),
  delete: (id) => api.delete(`/warehouses/${id}`),
}

export const locationAPI = {
  getAll: () => api.get('/locations'),
  getById: (id) => api.get(`/locations/${id}`),
  getByWarehouse: (warehouseId) => api.get(`/locations/warehouse/${warehouseId}`),
  create: (data) => api.post('/locations', data),
  update: (id, data) => api.put(`/locations/${id}`, data),
  delete: (id) => api.delete(`/locations/${id}`),
}

export const productAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  getByCategory: (categoryId) => api.get(`/products/category/${categoryId}`),
  searchByName: (keyword) => api.get('/products/search/name', { params: { keyword } }),
  searchBySku: (keyword) => api.get('/products/search/sku', { params: { keyword } }),
  getOutOfStock: () => api.get('/products/status/out-of-stock'),
  getLowStock: () => api.get('/products/status/low-stock'),
  getInStock: () => api.get('/products/status/in-stock'),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
}

export const productStockAPI = {
  getAll: () => api.get('/product-stocks'),
  getById: (id) => api.get(`/product-stocks/${id}`),
  getByProduct: (productId) => api.get(`/product-stocks/product/${productId}`),
  getByWarehouse: (warehouseId) => api.get(`/product-stocks/warehouse/${warehouseId}`),
  getByLocation: (locationId) => api.get(`/product-stocks/location/${locationId}`),
  getByProductAndWarehouse: (productId, warehouseId) => 
    api.get(`/product-stocks/product/${productId}/warehouse/${warehouseId}`),
  create: (data) => api.post('/product-stocks', data),
  updateQuantity: (id, quantity) => api.put(`/product-stocks/${id}/quantity`, null, { params: { quantity } }),
  delete: (id) => api.delete(`/product-stocks/${id}`),
}

export default api
