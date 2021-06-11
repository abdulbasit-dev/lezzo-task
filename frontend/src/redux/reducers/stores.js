const initialState = {
  stores: {},
  error: null,
  loading: true,
};

const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_STORES':
      return {...state, loading: false, stores: action.payload};

    default:
      return state;
  }
};
export default storeReducer;
