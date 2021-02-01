import styled from 'styled-components';

import { Link } from "react-router-dom";


export const StyledLink = styled(Link)`
  height: 100% !important;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

export const ProductCardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  height: 100% !important;
  padding: 5px 40px 30px 15px;
  /* background-color: #fafafa; */
  background-color: #fff;
  /* border: 0.5px solid #e2e2e2; */

  
`;

export const RowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  /* margin: 1rem 0; */
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 40px !important;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;

`;

export const StyledImg = styled.img`
  width: 95%;
  height: 320px;
  padding: 5px 15px 5px;
  overflow: hidden;
  object-fit: contain;
  filter: ${props => !props.inStock ? "opacity(.4)" : "opacity(1)"};
`;

export const Price = styled.span`
  display: flex;
  /* margin: 0.5rem 0; */
  padding: 0.5rem 0;
  font-size: 20px;
  font-weight: 700;
  color: #202020;
  text-decoration: none;

  &:hover {
    text-decoration: none !important;
    color: #202020;
  }
`;

export const Title = styled.h1`
  display: flex;
  font-size: 18px;
  overflow: hidden;
  color: #222;
  text-decoration: none;
`;

export const CategoryTag = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #323232;
  text-decoration: none;
  margin: 0 !important;

`;

export const InfoBox = styled.div`
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

`;

export const NoStockTag = styled.div`
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;

  height: 1.5rem;
  width: fit-content;
  padding: 0 1rem;
  
  color: white;
  text-decoration: none;
  background: #232323;
  border-radius: 12px;
  z-index: 100;
`;

export const ButtonStyled = styled.button`
  border-radius: 3px;
  box-sizing: border-box;
  outline: none;
  border: 1px solid #d9d9d9;
  text-transform: uppercase;
  padding: 6px .85em;
  font-size: 12px;
  background: #e6e6e6;
  font-weight: 700;
  text-align: center;
  transition: 0.45s cubic-bezier(0.165, 0.84, 0.44, 1);
  margin-top: 0.5rem;

  &:hover {
    background: #cecdcd;
    border-color: #cecdcd;
  }

  &:focus {
    outline: none;
  }
`;
