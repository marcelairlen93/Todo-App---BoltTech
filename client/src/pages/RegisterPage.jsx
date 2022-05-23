import React, { useState, setState } from 'react';
import { useAuth } from '../contexts/auth';
import { useNavigate } from "react-router-dom";

import './register.style.css'
export function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [password, setPassword] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "firstName") {
      setFirstName(value);
    }
    if (id === "lastName") {
      setLastName(value);
    }
    if (id === "password") {
      setPassword(value);
    }

  }

  const handleSubmit = () => {
    const name = `${firstName} ${lastName}`;

    register({ name, username, password }).then(() => {
      navigate(state?.path || "/");
    });
  }

  const backToLogin = () => {
    navigate("/")
  }

  return (
    <div className="form">
      <div className="form-body">
        <div className="username">
          <label className="form__label" for="firstName">First Name </label>
          <input className="form__input" type="text" value={firstName} onChange={(e) => handleInputChange(e)} id="firstName" placeholder="First Name" />
        </div>
        <div className="lastname">
          <label className="form__label" for="lastName">Last Name </label>
          <input type="text" name="" id="lastName" value={lastName} className="form__input" onChange={(e) => handleInputChange(e)} placeholder="LastName" />
        </div>
        <div className="password">
          <label className="form__label" for="password">Password </label>
          <input className="form__input" type="password" id="password" value={password} onChange={(e) => handleInputChange(e)} placeholder="Password" />
        </div>
      </div>
      <div class="footer">
        <button onClick={() => handleSubmit()} type="submit" class="btn">Register</button>
        <button onClick={() => backToLogin()} type="submit" class="btn">Go To Login</button>
      </div>
    </div>

  )
}