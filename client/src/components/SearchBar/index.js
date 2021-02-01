import React, { useState } from "react";

// Components
import Button from "../Button";

// Styled Components
import { SearchBarForm, SearchInput, InputWrapper, SearchIconStyled } from "./styles";

const SearchBar = ({ handleSubmit }) => {

  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  return (
    <SearchBarForm onSubmit={(e) => handleSubmit(e, search)}>

      <InputWrapper>
        <SearchIconStyled />
        <SearchInput
          name="search"
          placeholder={"Search..."}
          onChange={handleChange}
        />
      </InputWrapper>

      <Button color={"#41434f"}>Search</Button>

    </SearchBarForm >
  );
};

export default SearchBar;