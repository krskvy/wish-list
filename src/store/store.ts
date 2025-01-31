import { configureStore } from '@reduxjs/toolkit';
import wishListReducer from './slices/wishlistSlice'
import { localStorageMiddleware } from './middleware/localStorageMiddleware'
import authReducer from './slices/authSlice'
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    wishList: wishListReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook to use typed dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;