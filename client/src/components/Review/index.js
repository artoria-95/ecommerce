import React from "react";

// Components
import Rating from "../Rating";

// Styled Components
import { ReviewWrapper, TopWrapper, Title, Date, Description, Author } from "./styles";

const Review = ({ stars, title, description, createdAt, user: { firstName, lastName } }) => {

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = new window.Date(createdAt);
  return (
    <ReviewWrapper>
      <Rating stars={stars} />
      <TopWrapper>
        <Title>{title}</Title>
        <Date>{date.toLocaleString("es-ES", options)}</Date>
      </TopWrapper>
      <Description>
        {description}
      </Description>
      <Author>{firstName + " " + lastName[0]} <span>- Client</span></Author>
    </ReviewWrapper>
  );
};

export default Review;