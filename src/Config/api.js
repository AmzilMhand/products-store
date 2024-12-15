import axios from 'axios';

const API_URL = 'http://localhost:5000/products';
const CATEGORIES_URL = 'http://localhost:5000/categories';

export const fetchProducts = () => axios.get(`${API_URL}?limit=0`);
export const fetchProductById = (id) => axios.get(`${API_URL}/${id}`);
export const createProduct = (product) => axios.post(API_URL, product);
export const updateProduct = (id, product) => axios.put(`${API_URL}/${id}`, product);
export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);

export const fetchCategories = () => axios.get(CATEGORIES_URL);
