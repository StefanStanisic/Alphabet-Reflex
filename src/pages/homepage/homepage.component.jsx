import React, { useState, useEffect } from 'react';

import './homepage.styles.css';

const HomePage = () => {
  const [gameStarted, setGameStarted] = useState('false');
  const [gameDifficulty, setGameDifficulty] = useState('');

  return (
    <div className='main-container'>
      <div className='difficulty-container'>
        <form className='difficulty' id="form"> 
          <input type="radio" name="difficulty" value="Easy" onClick={() => {setGameDifficulty('Easy')}} />
          <label>Easy</label>
          <input type="radio" name="difficulty" value="Medium" onClick={() => {setGameDifficulty('Medium')}} />
          <label>Medium</label>
          <input type="radio" name="difficulty" value="Hard" onClick={() => {setGameDifficulty('Hard')}} />
          <label>Hard</label>
        </form>
      </div>

      <div className='start-button-container'>
        {
          gameStarted ? 
            <button className='start-stop-button' onClick={() => setGameStarted(!gameStarted)}>Start Game</button> 
          : <button className='start-stop-button' onClick={() => setGameStarted(!gameStarted)}>Stop Game</button>
        }
      </div>
    </div>
  );
};

export default HomePage;