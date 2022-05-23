import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/auth";

export const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { login } = useAuth();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleLogin = () => {
    login(username, password).then(() => {
      navigate(state?.path || "/app");
    });
  };


  const goToRegister = () => {
    navigate("/signup");
  };

  const renderForm = (
    <div className="form">
      <form>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required value={username} onChange={handleUsernameChange} />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required value={password} onChange={handlePasswordChange} />
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <h1>Sign In</h1>
      {renderForm}
      <button type="submit" onClick={handleLogin}>Login</button>
      <button type="submit" onClick={goToRegister}>Sign Up</button>
    </div>
  );
};