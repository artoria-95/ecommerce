import React, { useState } from "react";
import { ReactComponent as ArrowUpIcon } from "../../assets/icons/arrowup.svg";
import { ReactComponent as ArrowDownIcon } from "../../assets/icons/arrowdown.svg";

// StyledComponents
import { UnitsAmountWrapper, ButtonsWrapper } from "./styles";

const UnitsAmount = ({count,setCount,handleChange}) => {

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1)
      setCount(count - 1);
  };

  return (
    <UnitsAmountWrapper>
      <input value={count} name='count' onChange={handleChange} size='1'/>
      <ButtonsWrapper>
        <ArrowUpIcon onClick={increment}>+</ArrowUpIcon>
        <ArrowDownIcon onClick={decrement}>-</ArrowDownIcon>
      </ButtonsWrapper>
    </UnitsAmountWrapper>
  );
};

export default UnitsAmount;