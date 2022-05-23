import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/auth";

export const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { login } = useAuth();

  const handleLogin = () => {
    login("masr", "12345678").then(() => {
      navigate(state?.path || "/app");
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};