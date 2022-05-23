import React from 'react';
import api from '../services/api';
import { storeCredentials, removeCredentials } from '../services/auth';

const AuthContext = React.createContext(null);

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authed, setAuthed] = React.useState(false);
  const [user, setUser] = React.useState({});

  const register = (name, username, password) => {
    try {
      const response = api.post("/users/register", { name, username, password });

      response.then((res) => {
        setAuthed(true);
        setUser({
          id: res.data.id,
          name: res.data.name,
        });
      });

      return response;
    } catch (err) {
      console.warn("Error while trying to Register")
      console.error(err.message);
    }
  };

  const login = (username, password) => {
    try {
      const response = api.post("/users/login", { username, password });

      response.then((res) => {
        setAuthed(true);
        setUser({
          id: res.data.id,
          name: res.data.name,
        });

        storeCredentials(res.data.token);
      });

      return response;
    } catch (err) {
      console.warn("Error while trying to LogIn")
      console.error(err.message);
    }
  };

  const logout = () => {
    try {
      const response = api.post("/users/logout");

      response.then(() => {
        setAuthed(false);
        setUser({});
        removeCredentials();
      });

      return response;
    } catch (err) {
      console.log("Error while trying to logout")
      console.error(err.message);
    }
  };

  const value = {
    authed,
    user,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(AuthContext);
}