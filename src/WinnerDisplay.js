import React from 'react';

function WinnerDisplay({ poll }) {
  const winner = poll.options.reduce((maxOption, option) => {
    return option.votes > maxOption.votes ? option : maxOption;
  }, poll.options[0]);

  return (
    <div>
      {winner.votes > 0 ? (
        <p>Winner: {winner.text}</p>
      ) : (
        <p>No winner yet</p>
      )}
    </div>
  );
}

export default WinnerDisplay;
