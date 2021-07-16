import React, { useState, useRef, useEffect } from 'react';

import LetterDisplay from '../../components/letter/letter.component';
import ScoreDisplay from '../../components/score/score.component';

import letters from '../../data/letters';

import './homepage.styles.css';

const HomePage = () => {
  const [gameDifficulty, setGameDifficulty] = useState(0);
  const [displayNumber, setDisplayNumber] = useState();
  const [lettersHit, setLettersHit] = useState(0);
  const [timerExpired, setTimerExpired] = useState(false)
  const [lettersMissed, setLettersMissed] = useState(0);
  const [lettersLeft, setLettersLeft] = useState(26);
  const [nums, setNums] = useState([...Array(26).keys()].map(d => d + 1))

  const [inputState, setInputState] = useState([])

  const radioRef1 = useRef(null);
  const radioRef2 = useRef(null);
  const radioRef3 = useRef(null);
  const inputRef = useRef(null);
  const gameStarted = useRef(false)

  const finishGame = () => {
    setTimeout(() => {
      setInputState([]);
      setNums([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]);
      setLettersLeft(26);
      setLettersMissed(0);
      setLettersHit(0);
      setGameDifficulty(0);
      setDisplayNumber();
      inputRef.current.value = '';
      gameStarted.current = false;

      radioRef1.current.checked = false;
      radioRef2.current.checked = false;
      radioRef3.current.checked = false;
      radioRef1.current.disabled = false;
      radioRef2.current.disabled = false;
      radioRef3.current.disabled = false;
    }, 2000);
  }

  const startGame = () => {
    if(gameDifficulty === 0) {
      alert('You have to choose dificulty')
    }
    if (gameDifficulty !== 0) {
      inputRef.current.disabled = false;
      inputRef.current.focus()
      gameStarted.current = true
      radioRef1.current.disabled = true;
      radioRef2.current.disabled = true;
      radioRef3.current.disabled = true;
      if (nums.length > 0) {
        let randomNumber = nums[Math.floor(Math.random() * nums.length)];
        setNums(nums.filter(num => num !== randomNumber));
        setDisplayNumber(randomNumber);
      } else if (nums.length === 0) {
        finishGame();
      }
    }
  }

  const inputHandler = (e) => {
    const inputString = e.target.value.slice(e.target.value.length - 1, e.target.value.length).toUpperCase();
    const shouldBe = letters.filter(elem => elem.number === displayNumber)[0].letter;
    if (shouldBe === inputString) {
      setInputState(prev => [...prev, { letter: inputString, inTime: timerExpired, correct: shouldBe === inputString }]);
      setLettersHit(prev => prev + 1);
      setLettersLeft(prev => prev - 1);
    } else {
      setInputState(prev => [...prev, { letter: shouldBe, inTime: false, correct: false }]);
      setLettersMissed(prev => prev + 1);
      setLettersLeft(prev => prev - 1);
    }
    inputRef.current.disabled = true;
    inputRef.current.value = '';
  }

  useEffect(() => {
    if (gameStarted) {
      setTimerExpired(true)
      setTimeout(() => {
        setTimerExpired(false)
        gameStarted.current && startGame()
      }, gameDifficulty);
    }
  }, [displayNumber])

  useEffect(() => {
    if (displayNumber && !timerExpired) {
      const shouldBe = letters.filter(elem => elem.number === displayNumber)[0].letter
      const inState = inputState.filter(elem => elem.letter === shouldBe)

      if (shouldBe !== inState[0]?.letter) {
        setInputState(prev => [...prev, { letter: shouldBe, inTime: false, correct: false }])
        setLettersMissed(prev => prev + 1);
        setLettersLeft(prev => prev - 1);
      }
    }

  }, [timerExpired])


  const stopGame = () => {
    gameStarted.current = false
    radioRef1.current.disabled = false;
    radioRef2.current.disabled = false;
    radioRef3.current.disabled = false;
    radioRef1.current.checked = false;
    radioRef2.current.checked = false;
    radioRef3.current.checked = false;
    setDisplayNumber()
    setGameDifficulty(0);
    setInputState([]);
    setLettersHit(0);
    setLettersMissed(0);
    setLettersLeft(26);
    gameStarted.current = false;
    setNums([...Array(26).keys()].map(d => d + 1));
    inputRef.current.value = '';
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
          !gameStarted.current ?
            <button className='start-stop-button' onClick={() => startGame()}>Start Game</button>
            : <button className='start-stop-button' onClick={() => stopGame()}>Stop Game</button>
        }
      </div>

      <div className="number-display-container">
        <p className='number-display'>{displayNumber}</p>
      </div>

      <div className="input-container">
        <input type="text" name="letter-input" className='letter-input' placeholder='Input Letter' onChange={inputHandler} ref={inputRef} />
      </div>

      <ScoreDisplay hit={lettersHit} miss={lettersMissed} left={lettersLeft}></ScoreDisplay>

      <div className="letters">
        <div className="letters-container">
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