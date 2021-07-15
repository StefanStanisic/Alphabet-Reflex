import React, { useState, useRef } from 'react';

import LetterDisplay from '../../components/letter/letter.component';
// import ScoreDisplay from '../../components/score/score.component';

import letters from '../../data/letters';

import './homepage.styles.css';

const HomePage = () => {
  const [gameStarted, setGameStarted] = useState('false');
  const [gameDifficulty, setGameDifficulty] = useState(0);
  const [lettersHit, setLettersHit] = useState(0);
  const [lettersMissed, setLettersMissed] = useState(0);
  const radioRef1 = useRef(null);
  const radioRef2 = useRef(null);
  const radioRef3 = useRef(null);

  const startGame = () => {
    if(gameDifficulty !== 0) {
      setGameStarted(!gameStarted); 
      radioRef1.current.disabled = true;
      radioRef2.current.disabled = true;
      radioRef3.current.disabled = true;
    }
  }

  const stopGame = () => {
    setGameStarted(!gameStarted);
    radioRef1.current.disabled = false;
    radioRef2.current.disabled = false;
    radioRef3.current.disabled = false;
  }

  let lettersArray = [];
  letters.forEach(elem => {
    lettersArray.push(<LetterDisplay letter={elem.letter} number={elem.number} key={elem.number}/>)
  })

  return (
    <div className='main-container'>
      <div className='difficulty-container'>
        <form className='difficulty' id="form"> 
          <input type="radio" name="difficulty" value="Easy" onClick={() => {setGameDifficulty(5000)}}  ref={radioRef1}/>
          <label>Easy</label>
          <input type="radio" name="difficulty" value="Medium" onClick={() => {setGameDifficulty(3500)}} ref={radioRef2} />
          <label>Medium</label>
          <input type="radio" name="difficulty" value="Hard" onClick={() => {setGameDifficulty(2000)}}  ref={radioRef3}/>
          <label>Hard</label>
        </form>
      </div>

      <div className='start-button-container'>
        {
          gameStarted ? 
            <button className='start-stop-button' onClick={startGame}>Start Game</button> 
          : <button className='start-stop-button' onClick={stopGame}>Stop Game</button>
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