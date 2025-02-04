import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { wishListService } from '../../services/wishListService';
import { Wish } from '../../types';


interface WishList {
  allWishes: Wish[];
}

const initialState: WishList = {
  allWishes: [],
};

// Load wishlist when user logs in
export const loadWishlist = createAsyncThunk(
  "wishlist/loadWishlist",
  async (userId: string, { rejectWithValue }) => {
    if (!userId) return rejectWithValue("No user ID provided");
    return wishListService.load(userId);
});

const wishList = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    updateWishList: (state, action: PayloadAction<{ userId: string; wishes: Wish[] }>) => {
      const { userId, wishes } = action.payload;
      state.allWishes = wishes;
      wishListService.save(userId, state.allWishes);
    },
    addWish: (state, action: PayloadAction<{ userId: string; wish: Wish }>) => {
      const { userId, wish } = action.payload;
      state.allWishes.push(wish);
      wishListService.save(userId, state.allWishes);
    },
    removeWish: (state, action: PayloadAction<{ userId: string ; wishId: string }>) => {
      const { userId, wishId } = action.payload;
      if (state.allWishes) {
        state.allWishes = state.allWishes.filter((wish: any) => wish.id !== wishId);
        wishListService.removeWish(userId, wishId);
      }
    },
    clearWishlist: (state) => {
      state.allWishes = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadWishlist.fulfilled, (state, action) => {
        state.allWishes = action.payload;
      })
      .addCase(loadWishlist.rejected, (state) => {
        state.allWishes = [];
      });
  },
});

export const { addWish, removeWish, clearWishlist, updateWishList} = wishList.actions;
export default wishList.reducer;