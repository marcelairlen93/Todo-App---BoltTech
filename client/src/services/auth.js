export const TOKEN_KEY = "@bolttech-todoapp";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const storeCredentials = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const removeCredentials = () => {
  localStorage.removeItem(TOKEN_KEY);
};