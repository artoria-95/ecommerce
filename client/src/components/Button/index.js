import React from 'react';
import { ButtonWrapper } from './styles';

const Button = ({ children, color, ...otherProps }) => {
  return (
    <ButtonWrapper color={color} {...otherProps}>
      <span>{children}</span>
    </ButtonWrapper>
  );
};


export default Button;
