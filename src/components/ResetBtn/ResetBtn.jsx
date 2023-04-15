import React from 'react'
import './ResetBtn.css'

export default function ResetBtn({onReset}) {
  return (
    <div>
      <button 
      className='resetBtn'
      onClick={onReset}
      >Reset</button>
    </div>
  )
}
