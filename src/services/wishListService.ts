
const LOCAL_STORAGE_KEY = 'wishList';

export const wishListService = {
  save: (data: object[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  },
  load: (): object[] => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },
};
