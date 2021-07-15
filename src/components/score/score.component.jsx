import React from 'react';

import './score.styles.css';

const ScoreDisplay = ({hit, miss, left}) => {
  return (
    <div className='score-container'>
      <p className='title'>Score</p>
      <p className='hit-value'>Hit: {hit}</p>
      <p className='miss-value'>Miss: {miss}</p>
      <p className='left-value'>Left: {left}</p>
    </div>
  )
}

export default ScoreDisplay;