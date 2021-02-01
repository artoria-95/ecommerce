import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";

export const SearchIconStyled = styled(SearchIcon)`
  margin: 0 1rem;
`;

export const SearchBarForm = styled.form`
  display: flex;
  width: 450px;
  height: 36px;
  background: white;
`;

export const InputWrapper = styled.label`
  border: 1px solid #41434f;
  display: flex;
  align-items: center;
  margin: 0;
`;

export const SearchInput = styled.input`
  margin-right: 1rem;
  border: none;
  outline: none;
  height: 34px;
  font-size: 18px;
`;