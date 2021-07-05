import React from 'react';
import './Button.css';

function Button({ value, type = '', clicked, children }) {
  return (
    // <button className={type} onClick={() => clicked(value, type)}>
    <button className={type} onClick={clicked.bind(null, value, type)}>
      {children}
    </button>
  );
}

export default Button;
