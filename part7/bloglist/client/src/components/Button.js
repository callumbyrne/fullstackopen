import React from 'react'

const Button = ({ action, text }) => (
  <button onClick={action}>{text}</button>
)

export default Button