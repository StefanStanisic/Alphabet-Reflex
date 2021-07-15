import React, { useState } from 'react';

import LetterDisplay from '../../components/letter/letter.component';
import letters from '../../data/letters';

import './homepage.styles.css';

const HomePage = () => {
  const [gameStarted, setGameStarted] = useState('false');
  const [gameDifficulty, setGameDifficulty] = useState('');
  let lettersArray = [];
  letters.forEach(elem => {
    lettersArray.push(<LetterDisplay letter={elem.letter} number={elem.number} key={elem.number}/>)
  })

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

      <div className="number-display-container">
        <p className='number-display'>15</p>
      </div>

      <div className="input-container">
        <input type="text" name="letter-input" className='letter-input' placeholder='input-letter' />
      </div>

      <div className="letters-container">
        {lettersArray}
      </div>
    </div>
  );
};

export default HomePage;