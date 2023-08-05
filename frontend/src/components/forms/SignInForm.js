import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Forms.css';

const SignInForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post('http://127.0.0.1:8000/api/auth/token/login/', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        const accessToken = response.data['auth_token']
        Cookies.set('access_token', accessToken, {expires: 7});
        navigate('/dashboard/');
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };
  

  return (
    <div className="form">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignInForm;