import styled from "styled-components";

export const ReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  padding: 0 2rem;
`;

export const TopWrapper = styled.div`
  display: flex;
  align-items:  center;
  justify-content: space-between;
  padding: 0.5rem 0;
  /* background: red; */
`;

export const Title = styled.h3`
  margin: 0;
  color: #323232;
  font-size: 28px;
`;

export const Date = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: #434343;
`;

export const Description = styled.p`
  font-size: 16px;
  font-weight: 300;
  color: #767676;
  margin-bottom: 0.5rem;
`;

export const Author = styled.span`
  font-weight: 500;
  color: #323232;

  & span {
    font-weight: 300;
  }
`;