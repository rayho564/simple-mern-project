import { createContext } from "react";

// Can be shared app-wide
export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
