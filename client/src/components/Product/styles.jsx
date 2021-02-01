import styled from "styled-components";

export const ProductDetailWrapper = styled.div`
  display: flex;
`;

export const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LeftSide = styled.div`
  display: flex;
  width: 60%;
`;

export const RightSide = styled.div`
  width: 40%;
`;

export const ImageContainer = styled.div`
  width: 90%;
  max-height: 500px;
  object-fit:  cover;

  img {
    height: 100%;
    max-width: 90%;
    object-fit: cover;
    overflow: hidden;
  }
`;

export const RatingWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

export const CategoriesTags = styled.div`
  display: flex;
`;

export const Title = styled.h1`
  margin: 1rem 0;
  font-size: 20px;
  /* font-size: 16px;
  color: #323232; */

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
