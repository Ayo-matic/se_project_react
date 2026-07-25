const baseUrl = "http://localhost:3001";

// Shared response check, matching the pattern used in api.js: resolve with
// parsed JSON when the request succeeded, reject with the status otherwise.
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

// POST /signup — register a new user. Expects { name, avatar, email, password }.
export function register({ name, avatar, email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
}

// POST /signin — log a user in. Expects { email, password }, resolves with
// an object containing a JWT (e.g. { token: "..." }).
export function login({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

// GET /users/me — verify a token and fetch the associated user's data.
// Used on app load to keep a user logged in across page refreshes.
export function checkToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}
