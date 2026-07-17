const baseUrl = "http://localhost:3001";

// Shared response check: resolve with parsed JSON when the request
// succeeded, reject with the status otherwise.
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

// GET /items — fetch all clothing items
function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

// POST /items — add a new clothing item
function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}

// DELETE /items/:id — remove a clothing item
function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then(checkResponse);
}

export { getItems, addItem, deleteItem };
