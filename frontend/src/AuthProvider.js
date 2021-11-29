import React, { useContext, createContext, useState } from "react";
import { fakeAuthProvider } from "./Auth";

const authContext = createContext();

const AuthProvider = function({ children }) {
  const auth = useAuthProvider();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
};

const useAuth = function() {
  return useContext(authContext);
};

const useAuthProvider = function() {
  const [user, setUser] = useState(null);

  const signin = callback => {
    return fakeAuthProvider.signin(() => {
      setUser("user");
      callback();
    });
  };

  const signout = callback => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  return {
    user,
    signin,
    signout
  };
};

export { useAuth, AuthProvider, useAuthProvider };
