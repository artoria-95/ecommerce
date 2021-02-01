import React from "react";

// Icons
import { ReactComponent as StarIconFull } from '../../assets/icons/starfull.svg';
import { ReactComponent as StarIconEmpty } from '../../assets/icons/starempty.svg';

// StyledComponets
import { RatingWrapper } from "./styles";

const Rating = ({ stars = 5 }) => {
  return (
    <RatingWrapper>
      {
        [...Array(Math.round(stars))].map((s, i) => <StarIconFull key={i} />)
      }
      {
        [...Array(5 - Math.round(stars))].map((s, i) => <StarIconEmpty key={i} />)
      }
    </RatingWrapper>
  );
};

export default Rating;