import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Dashboard.css';
import UpdateProfileForm from '../forms/UpdateProfileForm';
import placeholderImage from '../utils/placeholder.jpg';

const Dashboard = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/users/me/`,
        {
          headers: {
            'Authorization': Cookies.get('Authorization'),
          }
        });
      setUser(response.data);     
      
    } catch (error) {
      console.error('Error fetching user:', error);
      navigate('/');
    }
  };

  const handleOpenChangePasswordModal = () => {
    setChangePasswordModalOpen(true);
  };

  const handleCloseChangePasswordModal = () => {
    setChangePasswordModalOpen(false);
    setNewPassword('');
  };

  const handleChangePassword = async() => {
    try {
      await axios.post(`${backendUrl}/api/users/set_password/`,
      {
        new_password: newPassword,
        current_password: currentPassword,
      }, {
        headers: {
          'Authorization': Cookies.get('Authorization'),
        }
      });
      handleCloseChangePasswordModal();
    } catch (error) {
      console.error('Error changing password:', error);
      window.alert('Password must be longer than 8 characters');
    }
  };

  const handleLogoutButtonClick = () => {
    Cookies.remove('Authorization');
    navigate('/');
  };

  const handleDeleteButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`${backendUrl}/api/users/me/`,
      {
        data: {"current_password": confirmPassword},
        headers: {
          'Authorization': Cookies.get('Authorization'),
        }
      });
      setIsModalOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Error deleting user:', error);
      window.alert('Error deleting user, try again');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="profile-section">
        {user.picture ? (
          <img src={user.picture} alt="Image" />
        ) : (
          <img src={placeholderImage} alt="Placeholder" />
        )}
      </div>
      <div className="form-section">
        {user ? (
          <UpdateProfileForm userData={user} />
        ) : (
          <p>Loading...</p>
        )}
        <button className="password-button" onClick={handleOpenChangePasswordModal}>
          Change profile password
        </button>
        <button className="delete-button" onClick={handleDeleteButtonClick}>
          Delete profile
        </button>
        <button className="logout-button" onClick={handleLogoutButtonClick}>
          Logout
        </button>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          className="modal"
          overlayClassName="overlay"
        >
          <div>
            <h2>Confirm Deletion</h2>
            <p>Please enter your password to confirm:</p>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleDeleteUser}>Confirm</button>
            <button onClick={handleModalClose}>Cancel</button>
          </div>
        </Modal>

        <Modal
          isOpen={isChangePasswordModalOpen}
          onRequestClose={handleCloseChangePasswordModal}
          className="modal"
          overlayClassName="overlay"
        >
        <div>
          <h2>Change Password</h2>
          <p>Enter your current password:</p>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <p>Enter your new password:</p>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleChangePassword}>Change Password</button>
          <button onClick={handleCloseChangePasswordModal}>Cancel</button>
        </div>
      </Modal>

      </div>
    </div>
  );
};

export default Dashboard;
