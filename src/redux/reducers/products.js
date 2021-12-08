const initialState = {
  products: {},
  error: null,
  loading: true,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {...state, loading: false, products: action.payload};

    default:
      return state;
  }
};
export default categoryReducer;
