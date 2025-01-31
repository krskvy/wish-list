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

  login: (user: {username: string, password: string}): User | undefined=> {
    const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
    return users.find(u => u.username === user.username && u.password === user.password);
  },

  getCurrentUser: (): User | null => {
    return JSON.parse(localStorage.getItem("currentUser") || "null");
  },

  setCurrentUser: (userToSet: User): void => {
    localStorage.setItem("currentUser", JSON.stringify(userToSet));
  },

  logout: (): void => {
    localStorage.removeItem("currentUser");
  },
  getToken: (): string => {
    return 'token';
  }
};