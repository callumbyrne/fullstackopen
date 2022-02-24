import React from 'react'

const Button = ({ className, action, text }) => (
  <button className={className} onClick={action}>
    {text}
  </button>
)

export default Button
