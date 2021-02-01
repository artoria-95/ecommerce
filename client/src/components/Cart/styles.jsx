import styled from "styled-components";

export const ProductWrapper = styled.div`
  display: flex; 
  justify-content:center;
  border: solid grey 1px;
  margin: 20px;
  padding: 3rem;
  width: 100%;
`;

export const LeftSide = styled.div`
  display: flex;
  justify-content:center;
  width: 50%;
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction:column;
  width: 70%;
`;

export const ImageContainer = styled.div`
  display:flex;  
  justify-content: center;
  

  img {
    width: 100%;
    overflow: hidden;
  }
`;

export const CategoriesTags = styled.div`
  display: flex;
`;

export const Title = styled.h1`
  margin: 1rem 0;
  font-size: 20px;

`;
export const Description = styled.p``;

export const CategoryTag = styled.h3`
  display: flex;
  justify-content: center;
  margin-right: 0.5rem;
  align-items: center;
  width: fit-content;
  color: white;
  background: #232323;
  padding: 0.5rem;
  margin-top: 1rem;
  font-size: 18px;
  font-weight: 400;
`;

export const Price = styled.h3`
  margin: 1rem 0;
  font-size: 26px;
`;

export const ButtonsWrapper = styled.div`
  display: flex
`;