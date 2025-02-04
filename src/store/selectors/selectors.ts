import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectAllWishes = (state: RootState) => state.wishList.allWishes;
const selectUser = (state: RootState) => state.auth.user;

export const selectWishById = createSelector(
  [selectAllWishes, (_: RootState, wishId: string) => wishId],
  (allWishes, wishId) => allWishes.find((wish) => wish.id === wishId)
);

export const selectUserId = createSelector(
  [selectUser],
  (user) => user?.id || null
);