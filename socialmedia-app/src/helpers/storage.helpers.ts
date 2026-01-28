export const secureStorage = {
  set: (key: string, value: string) =>
    localStorage.setItem(key, window.btoa(JSON.stringify(value))),
  get: (key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(window.atob(item)) : null;
  },
  remove: (key: string) => localStorage.removeItem(key),
};