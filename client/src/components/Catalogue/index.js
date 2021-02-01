import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../redux/actions/product";

// Components
import ProductCard from '../ProductCard';

// Styled Components
import {
  CatalogueWrapper,
  CategoriesTitle,
  CategoriesColumn,
  CategoryButton,
  ProductsColumn,
} from './styles';

const Catalogue = () => {

  const [filtered, setFiltered] = useState([]);

  const dispatch = useDispatch();

  const products = useSelector(state => state.product.products);
  const categories = useSelector(state => state.category.categories);

  const handleFilter = (categoryId) => {
    setFiltered(products.filter(p => p.categories.map(c => c.id).includes(categoryId)));
  };

  const getAllProducts = () => {
    setFiltered([]);
    dispatch(getProducts());
  };

  return (
    <CatalogueWrapper>

      <CategoriesColumn>
        <CategoriesTitle>Categories</CategoriesTitle>
        <CategoryButton
          onClick={() => getAllProducts()}
        >
          All Products
        </CategoryButton>
        {
          categories.map((category) => (
            <CategoryButton
              key={category.id}
              onClick={() => handleFilter(category.id)}
            >
              {category.name}
            </CategoryButton>
          ))
        }
      </CategoriesColumn>

      {
        filtered.length ?
          <ProductsColumn>
            {filtered.map((product) => <ProductCard product={product} categories={product.categories} reviews={product.reviews} key={product.id} />)}
          </ProductsColumn>
          :
          <ProductsColumn>
            {products.map((product) => <ProductCard product={product} categories={product.categories} reviews={product.reviews} key={product.id} />)}
          </ProductsColumn>
      }

    </CatalogueWrapper>
  );
};

export default Catalogue;