import React from 'react';

import './letter.styles.css'

const LetterDisplay = ({letter, number, color}) => {
  return (
    <p className='values' style={{color: color}}>{letter}  ({number})  </p>
  )
}

export default LetterDisplay;