import styled from "styled-components";

export const StepsHeader = styled.div`
  width: 80vw;
  height: fit-content;
  display: flex;
  background: white;
  border-radius: 10px;
  padding: 1rem 2rem;
`;

export const StepButton = styled.div`
  height: 100%;
  margin: 0 1rem;
  display: flex;
  align-items:  center;
  font-weight: bold;
  color: #021229;

  & span {
    margin-left: 1rem;
    text-decoration: ${props => props.active ? "underline" : "none"};
  }
  & span:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const StepNumber = styled.div`
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background: ${props => props.active ? "#1b293e" : "#fd3464"};
  color: white;

`;

export const FormWrapper = styled.div`
  width: 60%;
  background: white;
  border-radius: 10px;
  padding: 1rem 2rem;
`;

export const Main = styled.div`
  width: 80vw;
  height: 100%;
  display: flex;
  margin: 2rem 0;
`;

export const CheckoutFormWrapper = styled.div`
  height: calc(100vh - 4rem);

  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
`;