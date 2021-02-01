import styled from "styled-components";

export const UnitsAmountWrapper = styled.div`
  background: #232323;
  min-width: 40px;  
  height: 100%;
  color: white;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  margin: 10px 10px;

  span {
     font-size:18px;
     margin-right: 15px;
     -webkit-user-select: none;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  -webkit-user-select: none;

  svg {
    width: 18px;
    height: 18px;
    margin: 2px 0;
    cursor: pointer;
  }
`;