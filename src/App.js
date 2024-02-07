// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [contestants, setContestants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating data fetching with a delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        const data = [
          { id: 1, name: 'Contestant A', votes: 0 },
          { id: 2, name: 'Contestant B', votes: 0 },
          { id: 3, name: 'Contestant C', votes: 0 },
        ];
        setContestants(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleVote = (id) => {
    const updatedContestants = contestants.map((contestant) =>
      contestant.id === id ? { ...contestant, votes: contestant.votes + 1 } : contestant
    );
    setContestants(updatedContestants);
  };

  const getWinningContestant = () => {
    const sortedContestants = [...contestants].sort((a, b) => b.votes - a.votes);
    return sortedContestants[0];
  };

  const winningContestant = getWinningContestant();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="App">
      <h1>Polling App</h1>
      <h2>Vote for your favorite contestant:</h2>
      <ul>
        {contestants.map((contestant) => (
          <li key={contestant.id}>
            <span>{contestant.name}</span>
            <button onClick={() => handleVote(contestant.id)}>Vote</button>
            <span>Votes: {contestant.votes}</span>
          </li>
        ))}
      </ul>
      <h2>Winning Contestant:</h2>
      <p>{winningContestant.name} - {winningContestant.votes} votes</p>
    </div>
  );
}

export default App;
