import { Middleware } from '@reduxjs/toolkit';
import { wishListService } from '../../services/wishListService';

export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  // Save the updated state to local storage after any action
  const state = store.getState();
  wishListService.save(state.wishList.allWishes);

  return result;
};