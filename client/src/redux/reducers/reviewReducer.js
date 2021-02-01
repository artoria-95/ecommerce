import {
  CREATE_REVIEW,
  GET_ALL_REVIEWS
} from "../actions/review";

const initialState = {
  reviews: [],
  average: null,
  recomendedPercentage: null
};

const reviewReducer = (state = initialState, action) => {
  let average, recomendedPercentage, reviews;
  switch (action.type) {
    case GET_ALL_REVIEWS:
      average = action.reviews.reduce((prev, curr) => prev + curr.stars, 0) / action.reviews.length;
      recomendedPercentage = action.reviews.reduce((prev, curr) => curr.stars >= 4 ? prev + 1 : prev, 0) / action.reviews.length * 100;
      return {
        ...state,
        reviews: action.reviews,
        average,
        recomendedPercentage
      };
    case CREATE_REVIEW:
      reviews = state.reviews.concat(action.review);
      average = reviews.reduce((prev, curr) => prev + curr.stars, 0) / reviews.length;
      recomendedPercentage = reviews.reduce((prev, curr) => curr.stars >= 4 ? prev + 1 : prev, 0) / reviews.length * 100;
      return {
        ...state,
        reviews,
        average,
        recomendedPercentage
      };
    default:
      return state;
  };
};

export default reviewReducer;