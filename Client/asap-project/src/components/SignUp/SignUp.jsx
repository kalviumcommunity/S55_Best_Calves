import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css'

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { username, password } = data;
    try {
      if (password.length < 6) {
        setSignupError("Password should be more than 5 characters");
        return;
      }

      const response = await axios.post(`https://calf-kings.onrender.com/signup`, { username, password });
      if (response.status === 200) {
        sessionStorage.setItem('login', true);
        sessionStorage.setItem('signupSuccess', 'Signup successful'); 
        sessionStorage.setItem('username', username);
        navigate("/");
      } else {
        setSignupError('Signup failed');
      }
    } catch (err) {
      console.error(err);
      setSignupError('An error occurred during the signup');
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

        <button type="submit" className="button">SIGNUP</button>
        <p className='option'>
          Already a user?
          <span className='option2'><Link to="/login">Login</Link></span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
