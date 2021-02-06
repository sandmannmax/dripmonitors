import { getInstance } from "./index";

export const authGuard = (to, from, next) => {
  const authService = getInstance();

  const fn = () => {
    if (authService.isAuthenticated) {
      return next();
    }
    
    if (!window.location.search.includes("code=") || !window.location.search.includes("state="))
      authService.loginWithRedirect();
  };

// If loading has already finished, check our auth state using `fn()`
  if (!authService.isLoading) {
    return fn();
  }

  authService.$watch("isLoading", isLoading => {
    if (isLoading === false) {
      return fn();
    }
  });

};