import { Wish } from "../types";

const LOCAL_STORAGE_KEY = 'wishList';

export const wishListService = {
  save: (userId: string, allWishes: Wish[]) => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsedData = data ? JSON.parse(data) : {};
    parsedData[userId] = allWishes;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsedData));
  },
  load: (userId: string): Wish[] => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    const allWishes: Record<string, Wish[]> = data ? JSON.parse(data) : {};
    return allWishes[userId] || []; // Return the wishlist for the specific user
  },
  loadAll: (): Record<string, Wish[]> => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  },
  addWish: (userId: string, wish: Wish) => {
    let allWishes = wishListService.load(userId); 
    if (!allWishes) {
      allWishes = [];
    }
    allWishes.push(wish);
    wishListService.save(userId, allWishes);
  },
  removeWish: (userId: string, wishId: string) => {
    let allWishes = wishListService.load(userId);
    if (allWishes) {
      allWishes = allWishes.filter((wish) => wish.id !== wishId);
      wishListService.save(userId, allWishes);
    }
  },
  clear: (userId: string) => {
    wishListService.save(userId, []);
  },
};
