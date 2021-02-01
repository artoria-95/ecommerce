import styled from 'styled-components';
import { Link } from 'react-router-dom';


export const NavWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  background-color: #021229;
  justify-content: space-around;
  align-items: center;
  /* overflow: hidden; */
`;

export const NavWrapper2 = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  background-color: #021229;
  justify-content: flex-end;
  margin-left:auto;
`;

export const NavWrapper3 = styled.div`
  display: flex;
  width: 100%;
  height: 36px;
  background-color: #121323;
  justify-content: space-around;
  margin-left:auto;
  align-items: center;
  transition: 0.15s;
`;

export const DivWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  height:auto;
  margin:10px;
  margin-left:20px;
`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  height:auto;
  margin-right: 1.5rem;
  color:#000;
  color: rgba(0,0,0,0);
  text-shadow: 0 0 0 #000;
`;

export const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0 0.5rem;
  transition: 0.15s;
  &:hover{
    color: #df1484;
    text-decoration: none;
  }
`;

export const LoginRegisterLinks = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0 0.5rem;
  font-size: 16px;
  transition: 0.15s;
  &:hover{
    color: #df1484;
    text-decoration: none;
  }
`;