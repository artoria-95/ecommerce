import styled from "styled-components";

export const ButtonWrapper = styled.button`
  width: 100%;
  height: 100%;
  background: ${(props) => props.color ? props.color : "#232323"};
  color: white;
  padding: 0 1rem;
  border: none;
  outline: none !important;
  cursor: pointer;
  -webkit-user-select: none;
  transition: 0.15s;
  &:hover {
    background-color: #3b3b3b;
  }
  
  span {
    font-size: 20px;
    font-weight: 500;
  }

  &:disabled {
    filter: opacity(.4);
    cursor: not-allowed;
  }
`;