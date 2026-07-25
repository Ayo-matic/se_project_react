import { createContext } from "react";

// The provider's value is the currentUser object itself (or null when no
// one is logged in) — see App.jsx. Components can treat a truthy
// currentUser as "logged in".
export const CurrentUserContext = createContext(null);
