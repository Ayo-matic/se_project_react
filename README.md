# WTWR (What To Wear?) — Frontend

A React front end for the WTWR app. Given a location's current weather, it
recommends clothing items from a set of options.

## Features implemented in this sprint

- Clothing cards rendered from a hard-coded array (`utils/clothingItems.js`)
- Live call to the OpenWeather API on mount; temperature + city saved to
  React state
- Cards filtered by the current temperature (`hot` / `warm` / `cold`)
- Header shows the current date and location
- "Add clothes" modal (`ModalWithForm`) that opens/closes and adds a new
  card to the grid
- Item preview modal (`ItemModal`) that opens when a card image is clicked
- Modals close on the close button, the Escape key, or an overlay click
- Responsive layout: 4-column grid on desktop, 2-column on tablet, 1-column
  on small phones, with a collapsible hamburger menu in the header

## Tech

- React 18 (functional components + hooks: `useState`, `useEffect`)
- Vite 5 as the build tool and dev server
- Plain CSS with BEM-style class names, one stylesheet per component
- Fetch API for the OpenWeather integration
- ESLint + Prettier for linting and formatting

## Screenshots

_Add a screenshot or GIF of the desktop and mobile views here before
submitting — reviewers weight this highly._

## Demo video

_Add a short Loom/screen-recording link here walking through opening the
add-clothes modal, clicking a card, and the responsive header collapsing on
mobile._

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

## OpenWeather API key

The API key and coordinates live in `src/utils/constants.js`. Swap the
`coordinates` object for whichever location you want the app to report on.

## Deploying to GitHub Pages

```bash
npm run deploy
```

Then, in your repo's Settings → Pages, set the source branch to `gh-pages`.

Live demo: https://YOUR_USERNAME.github.io/se_project_react/
