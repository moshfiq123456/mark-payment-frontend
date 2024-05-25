import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productSlice'; // Adjust the import path
import rootReducer from './rootReducer';
import { thunk } from 'redux-thunk';


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // You can customize the middleware options here if needed
      thunk: {
        extraArgument: {}, // You can pass extra arguments to thunks here
      },
      serializableCheck: false, // Disable serializable check if you have non-serializable values in state or actions
    }),
});
export default store;