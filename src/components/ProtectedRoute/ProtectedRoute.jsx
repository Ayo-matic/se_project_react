import { Navigate } from "react-router-dom";

// A wrapper component (not a full HOC) used to gate private routes.
// If the user isn't logged in, redirect them to the main page ("/") instead
// of rendering the protected children. Unlike a typical login-page redirect,
// this app opens Login/Register as modals over "/", so there's no separate
// route to send unauthorized users to.
function ProtectedRoute({ isLoggedIn, isCheckingToken, children }) {
  // While the initial useEffect in App.jsx is still verifying a token found
  // in localStorage, isLoggedIn is momentarily false even for a user who IS
  // authenticated. Without this check, refreshing the page while on
  // /profile would briefly redirect them to "/" before the check resolves.
  if (isCheckingToken) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
