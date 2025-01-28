import { createSlice } from '@reduxjs/toolkit';
import { wishListService } from '../../services/wishListService';

interface WishList {
  allWishes: object[];
}

const initialState: WishList = {
  allWishes: wishListService.load(),
};

const wishList = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    addWish: (state, action: {payload: object}) => {
      state.allWishes.push(action.payload);
    },
    removeWish: (state, action:{ payload: number }) => {
      state.allWishes.splice(action.payload,1);
    },
  }
});

export const { addWish, removeWish } = wishList.actions;
export default wishList.reducer;