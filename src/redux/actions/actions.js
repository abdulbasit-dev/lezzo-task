// Action: Changes the state
export const getStores = data => ({type: 'GET_STORES', payload: data});
export const getCategories = data => ({type: 'GET_CATEGORIES', payload: data});
export const getProducts = data => ({
  type: 'GET_PRODUCTS',
  payload: data,
});
