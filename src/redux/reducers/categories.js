const initialState = {
  categories: {},
  error: null,
  loading: true,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CATEGORIES':
      return {...state, loading: false, categories: action.payload};

    default:
      return state;
  }
};
export default categoryReducer;
