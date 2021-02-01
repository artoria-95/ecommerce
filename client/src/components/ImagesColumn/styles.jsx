import styled from "styled-components";

export const ImagesColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 10%;
`;
export const ImageBox = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
  cursor: pointer;
  border: 2px solid transparent;
  filter: opacity(0.6);

  &:hover {
    filter: opacity(1);
    border: 2px solid #232323;
  }
`;