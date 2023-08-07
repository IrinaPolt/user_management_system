import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Forms.css';


const UpdateProfileForm = ({ userData }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      username: userData.username,
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
      picture: userData.picture,
      password: ''
    }));
  }, [userData]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: reader.result,
        }));
      };
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        'http://127.0.0.1:8000/api/users/me/',
        formData,
        {
          headers: {
            'Authorization': Cookies.get('Authorization'),
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit profile</h2>
      <div id="update">
        <label htmlFor="picture">Profile Picture:</label>
        <input type="file" id="picture" name="picture" onChange={handleChange} />
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} />
        <label htmlFor="first_name">First Name:</label>
        <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} />
        <label htmlFor="last_name">Last Name:</label>
        <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} />
        <label htmlFor="last_name">Password:</label>
        <input type="text" id="password" name="password" value={formData.password} onChange={handleChange} />
      </div>
      <br></br>
      <button>Update profile info</button>
    </form>
  );
};

export default UpdateProfileForm;
