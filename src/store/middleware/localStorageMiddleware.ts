import { Middleware} from "@reduxjs/toolkit";
import { wishListService } from "../../services/wishListService";
import { authService } from "../../services/authService";
import { RootState } from "../store";
import { loginUser } from "../slices/authSlice";
import { addWish, removeWish} from "../slices/wishlistSlice";

export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const isWishlistUpdated = addWish.match(action) || removeWish.match(action);
  const isUserLoggedIn = loginUser.fulfilled.match(action);
  const result = next(action);
  const state = store.getState() as RootState;
  const user = state.auth.user;

  if (user?.id && isWishlistUpdated) {
    console.log('middleWare: Data saved to current User: ', action);
    wishListService.save(user?.id, state.wishList.allWishes);
  }
  
  if (user && isUserLoggedIn) {
    authService.setCurrentUser(user);
  }

  return result;
};
