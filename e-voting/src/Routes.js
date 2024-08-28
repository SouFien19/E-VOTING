// src/Routes.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/login';
import Register from './components/Auth/register';
import AdminDashboard from './components/Admin/dashboard';
import CandidateDashboard from './components/Candidate/candidateboard';
import VoterDashboard from './components/Voter/Voterboard';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
      <Route path="/voter/dashboard" element={<VoterDashboard />} />
    </Routes>
  </Router>
);

export default AppRoutes;