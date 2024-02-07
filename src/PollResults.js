import React from 'react';

function PollResults({ poll, onVote }) {
  const handleVote = async (optionId) => {
    // Send PATCH request with authentication
    try {
      const response = await fetch(`/api/polls/${poll._id}/votes`, {
        // ... (security-sensitive details)
      });

      if (!response.ok) {
        throw new Error('Error voting');
      }

      const updatedPoll = await response.json();
      onVote(updatedPoll);
      socket.emit('pollVote', updatedPoll); // Notify other clients
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h2>{poll.question}</h2>
      <ul>
        {poll.options.map((option) => (
          <li key={option._id}>
            {option.text} - Votes: {option.votes}
            <button onClick={() => handleVote(option._id)}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PollResults;
