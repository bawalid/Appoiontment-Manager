import React from 'react';
import './Button.scss';
import {a } from 'react-spring';

function Button({ text, onClick, variant = '', show }) {

  return (
    <a.button className={'button ' + variant} onClick={onClick}>    
        {text}
    </a.button>
  );
}

export default Button;
