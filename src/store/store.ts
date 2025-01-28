import { configureStore } from '@reduxjs/toolkit';
import wishList from './slices/wishlistStore'
import { localStorageMiddleware } from './middleware/localStorageMiddleware'


export const store = configureStore({
  reducer: {
    wishList,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;