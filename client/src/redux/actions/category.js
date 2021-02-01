import axios from "axios";

// Types
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";

const getAllCategories = (categories) => {
  return {
    type: GET_ALL_CATEGORIES,
    categories
  };
};

const createCategory = (category) => {
  return {
    type: CREATE_CATEGORY,
    category
  };
};

const updateCategory = (category) => {
  return {
    type: UPDATE_CATEGORY,
    category
  };
};

const deleteCategory = (deletedId) => {
  return {
    type: DELETE_CATEGORY,
    deletedId
  };
};

export const getCategories = () => {
  return async (dispatch) => {
    try {

      const res = await axios.get("http://localhost:5000/products/category/");

      dispatch(getAllCategories(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addCategory = (category) => {
  return async (dispatch) => {
    try {

      const res = await axios.post(`http://localhost:5000/products/category`, { ...category });

      dispatch(createCategory(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const editCategory = (id, updatedCategory) => {
  return async (dispatch) => {
    try {

      const res = await axios.put(`http://localhost:5000/products/category/${id}`, { ...updatedCategory });

      dispatch(updateCategory(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeCategory = (id) => {
  return async (dispatch) => {
    try {

      const res = await axios.delete(`http://localhost:5000/products/category/${id}`);

      dispatch(deleteCategory(res.data.deletedId));
    } catch (err) {
      console.log(err);
    }
  };
};