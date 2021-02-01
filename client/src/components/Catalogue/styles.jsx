import styled from 'styled-components';

export const CatalogueWrapper = styled.div`
  display: flex;
  /* margin: 2rem 0; */
  /* margin-bottom: 113px; */
  background: #f4f5f7;
  padding: 40px 20px;
`;

export const ProductsColumn = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

export const CategoriesColumn = styled.div`
  display: flex;
  flex-direction: column;
  float: left;
  height: 100%;
  width:  234px;
  max-width: 100%;
  /* background-color: #fafafa; */
  margin: 0 1rem;
  padding: 20px ;
  border-right: 0.5px solid #e2e2e2;
  padding-right: 20px;
`;

export const CategoryButton = styled.div`
  display: flex;
  /* height: 40px; */
  align-items: center;
  justify-content: center;
  width: 100%;
  /* background: #f7f7f7; */
  background: transparent;
  /* border: 0.5px solid #dedede; */
  border-top: 0.5px solid #dedede;
  padding: 1rem 0.5rem;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  outline: none;
  text-transform: uppercase;
  transition: 0.45s cubic-bezier(0.165, 0.84, 0.44, 1);
  color: #323232;
  
  &:hover {
    /* background: #dedede; */
    color:#df1484;
  }
  
  &:focus {
    background: #dedede;
    outline: none;
    
  }
`;

export const CategoriesTitle = styled.h2`
  /* margin-bottom: 0.5rem;
  font-weight: 500; */
  padding: 0 20px 5px 0;
  font-weight: 700;
  font-size: 20px;
  margin-left: 20px;
  
`;

