import React from 'react';
import { InputWrapper } from '../SearchBar/styles';

const Input = ({ label, value, handleChange, ...otherProps }) => {
  return (
    <label>
      {label}
      <InputWrapper value={value} onChange={handleChange} {...otherProps} />
    </label>
  );
};

export default Input;
