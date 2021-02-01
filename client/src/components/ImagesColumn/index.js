import React from "react";

import { ImageBox, ImagesColumnWrapper } from "./styles";

const ImagesColumn = ({ product }) => {
  return (
    // TODO: FIX BUG IMAGES
    <ImagesColumnWrapper>
      {product.images && product.images.map((img) => <ImageBox src={img} alt={product.name} key={product.id + product.name} />)}
    </ImagesColumnWrapper>
  );
};

export default ImagesColumn;