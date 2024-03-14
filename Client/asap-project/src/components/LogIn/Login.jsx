import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "./Login.css";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loginMessage, setLoginMessage] = useState('');

  useEffect(() => {
    let timer;
    if (loginMessage) {
      timer = setTimeout(() => {
        setLoginMessage('');
        setMessageType('');
      }, 3000); 
    }
    return () => clearTimeout(timer); 
  }, [loginMessage]);

  const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };

  const onSubmit = async (data) => {
    const { username, password } = data;
    try {
      if (password.length < 6) {
        setLoginMessage("Password should be more than 5 characters");
        setMessageType('error');
        return;
      }

      const response = await axios.post(`https://calf-kings.onrender.com/login`, { username, password });
      if (response.status === 200) {
        setCookie('username', username, 365);
        setCookie('password', password, 365);
        sessionStorage.setItem('loginSuccess', 'Login successful');
        sessionStorage.setItem('login', true);
        sessionStorage.setItem('username', username);
        navigate("/");
      } else {
        setLoginMessage('Invalid Credentials');
        setMessageType('error');
      }
    } catch (err) {
      console.error(err);
      setLoginMessage('Invalid Credentials');
      setMessageType('error');
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label>Username:</label>
        <input type="text" {...register("username", { required: true })} />
        {errors.username && <p className="error">Username is required</p>}

        <label>Password:</label>
        <input
          type="password"
          {...register("password", {
            required: true,
            minLength: { value: 6, message: "Password should be more than 5 characters" }
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
        {loginMessage && <div className="error-message">{loginMessage}</div>}

        <button type="submit" className="button">LOGIN</button>
        <p className='option'>
          Not a user?
          <span className='option2'><Link to="/signup">Sign Up</Link></span>
        </p>
      </form>
    </div>
  );
}

export default Login;
