import React from 'react';

// Components
import Review from '../Review';
import Rating from '../Rating';

// Styled Components
import { ReviewsListWrapper, RecommendPercentage, TopWrapper, ReviewsNumber, PositionWrapper } from "./styles";
import { useSelector } from 'react-redux';


const ReviewsList = () => {

  let { reviews, average, recomendedPercentage } = useSelector(state => state.reviews);

  return (
    <ReviewsListWrapper>
      <TopWrapper>
        <ReviewsNumber>{reviews.length} Review{reviews.length > 1 ? "s" : ""}</ReviewsNumber>
        <PositionWrapper>
          {
            average ? <Rating stars={average} /> : null
          }
          <RecommendPercentage>
            {reviews.length > 0 &&
              <>
                <h4>{Math.round(recomendedPercentage)} %</h4>
                <span>of customers recommend this product</span>
              </>
            }
          </RecommendPercentage>
        </PositionWrapper>
      </TopWrapper>
      {reviews.map(r => <Review key={r.id} {...r} />)}
    </ReviewsListWrapper>
  );
};

export default ReviewsList;
