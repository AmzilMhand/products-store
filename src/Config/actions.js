import * as api from './api';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const SET_LOADING = 'SET_LOADING';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_FILTERED_PRODUCTS = 'SET_FILTERED_PRODUCTS';
export const SET_VISIBLE_COUNT = 'SET_VISIBLE_COUNT';

const setLoading = (loading) => ({ type: SET_LOADING, payload: loading });

export const getProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  const { data } = await api.fetchProducts();
  dispatch({ type: FETCH_PRODUCTS, payload: data });
  dispatch({ type: SET_FILTERED_PRODUCTS, payload: data });
  dispatch(setLoading(false));
};

export const getCategories = () => async (dispatch) => {
  const { data } = await api.fetchCategories();
  dispatch({ type: SET_CATEGORIES, payload: [{ slug: 'all', name: 'All Products' }, ...data] });
};

export const getProduct = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  const { data } = await api.fetchProductById(id);
  dispatch({ type: FETCH_PRODUCT, payload: data });
  dispatch(setLoading(false));
};

export const createProduct = (product) => async (dispatch) => {
  const { data } = await api.createProduct(product);
  dispatch({ type: CREATE_PRODUCT, payload: data });
};

export const updateProduct = (id, updatedProduct) => async (dispatch) => {
  const { data } = await api.updateProduct(id, updatedProduct);
  dispatch({ type: UPDATE_PRODUCT, payload: data });
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  await api.deleteProduct(id);
  dispatch({ type: DELETE_PRODUCT, payload: id });
  dispatch(setLoading(false));
};
export const setFilteredProducts = (filteredProducts) => {
    return {
        type: SET_FILTERED_PRODUCTS,
        payload: filteredProducts,
    };
};

export const setVisibleCount = (count) => ({
  type: SET_VISIBLE_COUNT,
  payload: count,
});
