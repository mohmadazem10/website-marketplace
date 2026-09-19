import React from 'react'

export default function Toast({ message, visible }) {
  return (
    <div className={`toast ${visible ? 'visible' : ''}`}>
      <span>✅</span><span>{message}</span>
    </div>
  )
}