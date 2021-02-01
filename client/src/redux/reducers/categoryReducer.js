import {
  GET_ALL_CATEGORIES,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
} from "../actions/category";

const initialState = {
  categories: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      };
    case CREATE_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.category]
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map(c => {
          if (c.id === action.category.id)
            return action.category;
          return c;
        })
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(c => c.id !== action.deletedId)
      };
    default:
      return state;
  }
};

export default categoryReducer;