import React, { useEffect, useState } from 'react';
import { getCandidates, vote } from '../../services/userService'; // Updated import

const VoterDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await getCandidates();
        setCandidates(data);
      } catch (err) {
        setError('Failed to fetch candidates');
      }
    };

    fetchCandidates();
  }, []);

  const handleVote = async () => {
    try {
      await vote(selectedCandidate);
      alert('Vote cast successfully!');
      setSelectedCandidate(null);
    } catch (err) {
      setError('Failed to cast vote');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Voter Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      <h2 className="text-2xl font-semibold mb-4">Candidates</h2>
      <div className="space-y-4">
        {candidates.map(candidate => (
          <div key={candidate.id} className="border p-4 rounded-md">
            <h3 className="text-xl font-bold">{candidate.name}</h3>
            <p>{candidate.description}</p>
            <button
              onClick={() => setSelectedCandidate(candidate.id)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Select
            </button>
          </div>
        ))}
      </div>
      {selectedCandidate && (
        <div className="mt-6">
          <button
            onClick={handleVote}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            Cast Vote
          </button>
        </div>
      )}
    </div>
  );
};

export default VoterDashboard;
