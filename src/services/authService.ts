import { User } from '../types';

export const authService = {
  register: (user: User): boolean => {
    const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
    if (users.some(u => u.username === user.username)) {
      return false; // Username already exists
    }
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  },

  login: (user: User): boolean => {
    const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
    return users.some(u => u.username === user.username && u.password === user.password);
  },

  getCurrentUser: (): User | null => {
    return JSON.parse(localStorage.getItem("currentUser") || "null");
  },

  setCurrentUser: (user: User): void => {
    localStorage.setItem("currentUser", JSON.stringify(user));
  },

  logout: (): void => {
    localStorage.removeItem("currentUser");
  },
};