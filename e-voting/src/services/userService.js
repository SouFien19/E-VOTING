// src/services/UserService.js
import axios from 'axios';

// Set up base URL for your API
const API_BASE_URL = 'http://localhost:5000/api';

// Admin Services
export const getUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data;
};

export const deleteUser = async (userId) => {
  await axios.delete(`${API_BASE_URL}/users/${userId}`);
};

// Voter Services
export const getCandidates = async () => {
  const response = await axios.get(`${API_BASE_URL}/candidates`);
  return response.data;
};

export const vote = async (candidateId) => {
  await axios.post(`${API_BASE_URL}/votes`, { candidateId });
};

// Candidate Services
export const submitCandidacy = async (candidacy) => {
    await axios.post(`${API_BASE_URL}/candidates/create-candidacy`, candidacy);
  };
