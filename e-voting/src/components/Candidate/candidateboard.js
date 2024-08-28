import React, { useState } from 'react';
import { submitCandidacy } from '../../services/userService'; 
import {  logout } from '../../services/authService'; // Ensure this import is correct

// Ensure this import is correct
import { useNavigate } from 'react-router-dom';

const CandidateDashboard = () => {
  const [position, setPosition] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await submitCandidacy({ position, description });
      setSuccess('Candidacy submitted successfully!');
      setPosition('');
      setDescription('');
    } catch (err) {
      setError('Failed to submit candidacy');
    }
  };

  const handleLogout = async () => {
    try {
      await logout(); // Ensure this clears user session/storage
      navigate('/login'); // Redirect to login page after logout
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Candidate Dashboard</h1>
        <button
          onClick={handleLogout}
          className="py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
        >
          Logout
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="position" className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <input
            id="position"
            name="position"
            type="text"
            placeholder="Position (e.g., President)"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out sm:text-sm"
          />
        </div>

        <div className="mt-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe your candidacy"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out sm:text-sm"
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Submit Candidacy
          </button>
        </div>
      </form>
    </div>
  );
};

export default CandidateDashboard;
