import React from "react";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/auth";
import { isAuthenticated } from "./services/auth";
import { ProjectProvider } from "./contexts/projects";

import { Login } from './pages/LoginPage';
import { Register } from './pages/RegisterPage';
import { Home } from './pages/HomePage';

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!isAuthenticated() || !auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

const AppRoutes = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/app" element={
          <RequireAuth>
            <ProjectProvider>
              <Home />
            </ProjectProvider>
          </RequireAuth>
        } />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default AppRoutes;