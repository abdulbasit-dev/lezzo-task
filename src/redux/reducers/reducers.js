import storeReducer from './stores';
import categoryReducer from './categories';
import productReducer from './products';
import {combineReducers} from 'redux';

// Reducer: How the action changes the state
const allReducer = combineReducers({
  stores: storeReducer,
  categories: categoryReducer,
  products: productReducer,
});
export default allReducer;
