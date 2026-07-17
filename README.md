# WTWR (What To Wear?) — Frontend

A React front end for the WTWR app. Given a location's current weather, it
recommends clothing items from a set of options.

## Features implemented in this sprint (Project 11)

- **Temperature unit toggle** — a custom `ToggleSwitch` component switches the
  displayed temperature between Fahrenheit and Celsius. The current unit and
  the toggle handler are shared app-wide through React Context
  (`CurrentTemperatureUnitContext`).
- **Routing** — React Router v6 provides two routes: `/` (Main) and
  `/profile` (Profile). The header logo links home and the profile info links
  to the profile page.
- **Profile page** — a `Profile` component composed of `SideBar` (user info)
  and `ClothesSection` (all clothing items, with an "+ Add new" button).
- **Controlled form via custom hook** — the `AddItemModal` form is controlled
  by a reusable `useForm` hook (`src/hooks/useForm.js`), including controlled
  radio inputs; fields reset only after a successful submission.
- **Mock server integration** — clothing items are loaded from, added to, and
  deleted from a `json-server` mock API (`db.json`) via `utils/api.js`
  (`GET /items`, `POST /items`, `DELETE /items/:id`).
- **Delete confirmation** — clicking "Delete item" in the item preview opens a
  confirmation modal; the card is only removed after the user confirms.

Carried over from earlier sprints: live OpenWeather API integration, cards
filtered by weather type, responsive layout, and modals that close via the
close button, Escape key, or overlay click.

## Tech

- React 18 (functional components + hooks: `useState`, `useEffect`,
  `useContext`, custom hooks)
- React Router v6
- React Context for global state
- json-server as a mock REST API
- Vite 5 as the build tool and dev server
- Plain CSS with BEM-style class names, one stylesheet per component
- Fetch API for the OpenWeather and mock-server integrations
- ESLint + Prettier for linting and formatting

## Screenshots

_Add a screenshot or GIF of the main page, the toggle switch, and the profile
page here before submitting — reviewers weight this highly._

## Project Pitch Video

Check out [this video](ADD_LINK_HERE), where I describe my project and some
challenges I faced while building it.

> ⚠️ Replace `ADD_LINK_HERE` with your Google Drive link (set to "Anyone with
> the link") before submitting. The project will not be accepted without it.

## Getting started

You'll need **two terminals** (VS Code's split terminal works well).

**Terminal 1 — mock API:**

```bash
npm install -g json-server@^0
json-server --watch db.json --id _id --port 3001
```

**Terminal 2 — React app:**

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000` and expects the mock API at
`http://localhost:3001`.

## OpenWeather API key

The API key and coordinates live in `src/utils/constants.js`. Swap the
`coordinates` object for whichever location you want the app to report on.

## Deploying to GitHub Pages

Per the project brief, it's recommended **not** to update the GitHub Pages
deployment for this sprint: the json-server API only runs locally, so the
deployed site's item requests would fail (and `BrowserRouter` would need to
be swapped for `HashRouter`). The project will be redeployed to Google Cloud
in a later sprint.
