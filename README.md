# WTWR (What To Wear?) — Frontend

A React front end for the WTWR app. Given a location's current weather, it
recommends clothing items from a set of options.

## Backend repository

🔗 [se_project_express](https://github.com/Ayo-matic/se_project_express)

> ⚠️ Critical submission requirement: this link must point to your **public**
> backend repository (the Express/MongoDB API from projects 12–13). The
> project may be returned without review if this link is missing or the
> backend repo is private.

## Features implemented in this sprint (Project 14)

- **Registration & login** — `RegisterModal` and `LoginModal` send
  `/signup` and `/signin` requests via `utils/auth.js`. After a successful
  registration, the user is signed in automatically.
- **Persistent sessions** — the JWT returned on login is saved to
  `localStorage` (`utils/token.js`). On page load, a `useEffect` in `App.jsx`
  checks for a saved token and calls `GET /users/me` to restore the session
  automatically, so users stay logged in across refreshes.
- **Protected routes** — a `ProtectedRoute` wrapper component keeps
  `/profile` inaccessible to logged-out users, redirecting them to the main
  page instead.
- **Current user context** — `CurrentUserContext` shares the logged-in
  user's data app-wide (header, sidebar, item cards, item modal) without
  prop-drilling.
- **Likes** — logged-in users can like/unlike clothing items; the like
  button is hidden entirely for logged-out visitors, and reflects the
  active state for items the current user has already liked.
- **Item ownership** — the delete button in the item preview modal is only
  shown to the item's owner. The profile page only lists items the current
  user has added.
- **Edit profile** — `EditProfileModal` lets a logged-in user update their
  name and avatar via `PATCH /users/me`.
- **Sign out** — clears the token from `localStorage` and returns the user
  to a logged-out state.

Carried over from earlier sprints: temperature unit toggle, weather-based
filtering, `useForm` custom hook, add/delete clothing items, delete
confirmation modal, live OpenWeather integration, responsive layout, and
modals that close via the close button, Escape key, or overlay click.

## Tech

- React 18 (functional components + hooks: `useState`, `useEffect`,
  `useContext`, custom hooks)
- React Router v6, including a custom `ProtectedRoute` wrapper component
- React Context for global state (temperature unit, current user)
- JWT-based authentication against a custom Express/MongoDB backend
- Vite 5 as the build tool and dev server
- Plain CSS with BEM-style class names, one stylesheet per component
- Fetch API for the OpenWeather and backend integrations
- ESLint + Prettier for linting and formatting

## Screenshots

_Add a screenshot or GIF of the main page, the login/register modals, and
the profile page here before submitting — reviewers weight this highly._

## Project Pitch Video

Check out [this video](ADD_LINK_HERE), where I describe my project and some
challenges I faced while building it.

> ⚠️ Replace `ADD_LINK_HERE` with your Google Drive link (set to "Anyone with
> the link") before submitting. The project will not be accepted without it.

## Getting started

You'll need **two terminals** (VS Code's split terminal works well).

**Terminal 1 — backend:**

Run your Express/MongoDB backend from projects 12–13 on port 3001 (make
sure `mongod` is running too). This project no longer uses `json-server` —
`/signup`, `/signin`, `/users/me`, likes, and item CRUD all need a real
backend that implements authentication.

**Terminal 2 — React app:**

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000` and expects the backend API at
`http://localhost:3001`.

## OpenWeather API key

The API key and coordinates live in `src/utils/constants.js`. Swap the
`coordinates` object for whichever location you want the app to report on.

## Deploying to GitHub Pages

Per the project brief, it's recommended **not** to update the GitHub Pages
deployment for this sprint unless your backend is also deployed somewhere
publicly reachable: the deployed frontend's requests would otherwise fail
(and `BrowserRouter` would need to be swapped for `HashRouter`).

