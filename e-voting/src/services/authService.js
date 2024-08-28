import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  if (response.data.token) {
    // Save user data including role and token
    localStorage.setItem('user', JSON.stringify(response.data.data));
    localStorage.setItem('token', response.data.token); // Save the token
  }
  return response.data;
};

export const register = async (username, email, password, role) => {
  try {
    return await axios.post(`${API_URL}/register`, { username, email, password, role });
  } catch (error) {
    console.error('Error during registration:', error.response ? error.response.data : error.message);
    throw error; // Re-throw the error to be handled in the component
  }
};

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`, {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  } catch (error) {
    console.error('Error during logout:', error.response ? error.response.data : error.message);
  } finally {
    // Clear local storage after attempting to log out
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};
