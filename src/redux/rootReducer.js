import { combineReducers } from 'redux';
import productsReducer from './slices/productSlice';
import usersReducer from './slices/usersSlice';

const rootReducer = combineReducers({
        products: productsReducer,
        users: usersReducer
    });

export default rootReducer;