import axios from "axios";
import { authAxios } from "./user";

// Types
export const GET_ALL_REVIEWS = "GET_ALL_REVIEWS";
export const CREATE_REVIEW = "CREATE_REVIEW";

const getAllReviews = (reviews) => {
  return {
    type: GET_ALL_REVIEWS,
    reviews
  };
};

const createReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review
  };
};

export const getReviews = (productId) => {
  return async (dispatch) => {
    try {

      const res = await axios.get(`http://localhost:5000/products/${productId}/review`);

      dispatch(getAllReviews(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addReview = (review, productId) => {
  return async (dispatch) => {
    try {

      const token = localStorage.getItem("token");
      const res = await authAxios.post(`http://localhost:5000/products/${productId}/review`, review, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(res.data);
      dispatch(createReview(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};