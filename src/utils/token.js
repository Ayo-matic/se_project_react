const TOKEN_KEY = "jwt";

// Saves the JWT returned by /signin to localStorage.
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Retrieves the JWT from localStorage, or null if none is present.
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Removes the JWT from localStorage (called on sign out).
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
