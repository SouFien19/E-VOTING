// src/services/candidatureService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/candidature'; // Update this URL based on your backend API

// Get the details of the current user's candidature
export const getCandidatureDetails = async () => {
  try {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the request header
      },
    });
    return response.data; // Return the candidature details
  } catch (error) {
    console.error('Error fetching candidature details:', error.response?.data?.message || error.message);
    throw error; // Re-throw the error to be handled in the component
  }
};

// Create a new candidature
export const createCandidature = async (candidatureData) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    const response = await axios.post(API_URL, candidatureData, {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the request header
      },
    });
    return response.data; // Return the created candidature data
  } catch (error) {
    console.error('Error creating candidature:', error.response?.data?.message || error.message);
    throw error; // Re-throw the error to be handled in the component
  }
};