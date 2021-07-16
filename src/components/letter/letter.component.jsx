import React from 'react';

import './letter.styles.css'

const LetterDisplay = ({letter, number, state}) => {

  const objState = state.filter(elem => elem.letter === letter)[0]

 function status() {
   if(objState) return {color: objState.inTime && objState.correct ? "green" : "red"}
   if(!objState) return {color: "gray"}
 }

  return (
    <p className='values' style={status()}>{letter} ({number})</p>
  )
}

export default LetterDisplay;