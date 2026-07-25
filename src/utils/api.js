const baseUrl = "http://localhost:3001";

// Shared response check: resolve with parsed JSON when the request
// succeeded, reject with the status otherwise.
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

// GET /items — fetch all clothing items. This is the one item-related
// route that does NOT require a token; it should work for anyone.
function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

// POST /items — add a new clothing item. Requires a valid token.
function addItem({ name, imageUrl, weather }, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}

// DELETE /items/:id — remove a clothing item. Requires a valid token; the
// backend should also confirm the requesting user owns the item.
function deleteItem(id, token) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

// PUT /items/:id/likes — add the current user's id to an item's likes array.
function addCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

// DELETE /items/:id/likes — remove the current user's id from an item's
// likes array.
function removeCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

// PATCH /users/me — update the current user's name and avatar.
function updateProfile({ name, avatar }, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
}

export {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  updateProfile,
  checkResponse,
};
