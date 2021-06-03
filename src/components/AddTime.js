import React from 'react'
import '../styles/AddTime.css'

export default function AddTime({ onClick }) {
  return (
    <button 
      className="addTime"
      onClick={() => onClick()}
    >
      + 1 min
    </button>

  )
}
