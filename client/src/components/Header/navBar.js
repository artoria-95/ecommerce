import React from 'react';
import { useDispatch } from "react-redux";
import { getProducts } from "../../redux/actions/product";

import SearchBar from '../SearchBar/index';

import { NavWrapper3, StyledLink } from "./styles";

const NavBar = () => {

  const dispatch = useDispatch();

  const handleSubmit = (e, search) => {
    e.preventDefault();
    dispatch(getProducts(search));
    // history.push("/products");
  };
  function handleClick(e) {
    e.preventDefault();
    alert('PC Creative - HENRY Labs 2021: ECommerce project created by Alejo Gschwind, Gisela Capozzi, Augusto Felicenzi, Ivan Carabajal, Santiago Aguirre, Gonzalo Aguilar & Ana Barua.');
  }

  
  return (
    <nav>
      <NavWrapper3>
    
        <StyledLink to='/'>PC Builder</StyledLink>

        <StyledLink to='/products'>Products</StyledLink>

        <StyledLink to='/' onClick={handleClick}>About Us</StyledLink>        

        <SearchBar handleSubmit={handleSubmit} />
      </NavWrapper3>
    </nav>
  );
};

export default NavBar;