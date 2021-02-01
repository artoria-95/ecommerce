import styled from "styled-components";

export const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:  center;
  position: relative;
  margin: 2rem 0;
`;

export const PositionWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 80px;
`;

export const ReviewsNumber = styled.h2`
  font-size: 164px;
  color: #eeeeee;
`;

export const ReviewsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RecommendPercentage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  & h4 {
    margin: 0;
    font-size: 89px;
    font-weight: 500;
    text-align: center;
    color: #323232;
  }

  & span {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    color: #323232;
  }
`;

