import React, { useState, useRef, useEffect } from 'react';

import LetterDisplay from '../../components/letter/letter.component';
import ScoreDisplay from '../../components/score/score.component';

import letters from '../../data/letters';
import numbers from '../../data/numbers';
import { cl } from '../../utils';

import './homepage.styles.css';

const HomePage = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameDifficulty, setGameDifficulty] = useState(0);
  const [displayNumber, setDisplayNumber] = useState();
  const [lettersHit, setLettersHit] = useState(0);
  const [timerExpired, setTimerExpired] = useState(false)
  const [lettersMissed, setLettersMissed] = useState(0);

  const [inputState, setInputState] = useState([])

  const radioRef1 = useRef(null);
  const radioRef2 = useRef(null);
  const radioRef3 = useRef(null);
  let numbersMap = numbers;

  const startGame = () => {
    if (gameDifficulty !== 0) {
      setGameStarted(true);
      radioRef1.current.disabled = true;
      radioRef2.current.disabled = true;
      radioRef3.current.disabled = true;
      const randomNumber = numbersMap.get([...numbersMap.keys()][Math.floor(Math.random() * numbersMap.size)]);
      setDisplayNumber(randomNumber);
    }
  }

  const inputHandler = (e) => {
    const inputString = e.target.value.slice(e.target.value.length - 1, e.target.value.length)
    const shouldBe = letters.filter(elem => elem.number === displayNumber)[0].letter
    if (shouldBe === inputString) {
      setInputState(prev => [...prev, { letter: inputString, inTime: timerExpired, correct: shouldBe === inputString }])
    } else {
      setInputState(prev => [...prev, { letter: shouldBe, inTime: false, correct: false }])
    }
  }

  useEffect(() => {
    if (gameStarted) {
      setTimerExpired(true)
      setTimeout(() => {
        setTimerExpired(false)
        startGame()
      }, gameDifficulty);
    }
  }, [displayNumber])

  useEffect(() => {

    if (displayNumber && !timerExpired) {
      const shouldBe = letters.filter(elem => elem.number === displayNumber)[0].letter
      const inState = inputState.filter(elem => elem.letter === shouldBe)

      if (shouldBe !== inState[0]?.letter) {
        setInputState(prev => [...prev, { letter: shouldBe, inTime: false, correct: false }])
      }
    }

  }, [timerExpired])


  const stopGame = () => {
    setGameStarted(!false);
    radioRef1.current.disabled = false;
    radioRef2.current.disabled = false;
    radioRef3.current.disabled = false;
  }

  return (
    <div className='main-container'>
      <div className='difficulty-container'>
        <form className='difficulty' id="form">
          <input type="radio" name="difficulty" value="Easy" onClick={() => { setGameDifficulty(5000) }} ref={radioRef1} />
          <label>Easy</label>
          <input type="radio" name="difficulty" value="Medium" onClick={() => { setGameDifficulty(3500) }} ref={radioRef2} />
          <label>Medium</label>
          <input type="radio" name="difficulty" value="Hard" onClick={() => { setGameDifficulty(2000) }} ref={radioRef3} />
          <label>Hard</label>
        </form>
      </div>

      <div className='start-button-container'>
        {
          !gameStarted ?
            <button className='start-stop-button' onClick={startGame}>Start Game</button>
            : <button className='start-stop-button' onClick={stopGame}>Stop Game</button>
        }
      </div>

      <div className="number-display-container">
        <p className='number-display'>{displayNumber}</p>
      </div>

      <div className="input-container">
        <input type="text" name="letter-input" className='letter-input' placeholder='input-letter' onChange={inputHandler} />
      </div>

      <ScoreDisplay hit={lettersHit} miss={lettersMissed} left={0}></ScoreDisplay>

      <div className="letters">
        <div className="letters-container">
          {/* {lettersArray} */}
          {
            letters.map(elem => (
              <LetterDisplay letter={elem.letter} number={elem.number} key={elem.number} state={inputState} />
            ))
          }
        </div>
      </div>

    </div>
  );
};

export default HomePage;