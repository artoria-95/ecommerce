import axios from "axios";
import { authAxios } from "./user";

// Types
export const GET_DETAIL_PRODUCT = "GET_DETAIL_PRODUCT";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const SET_CATEGORY_TO_PRODUCT = "SET_CATEGORY_TO_PRODUCT";
export const UNSET_CATEGORY_TO_PRODUCT = "UNSET_CATEGORY_TO_PRODUCT";
export const GET_PRODUCTS_FILTERED_BY_CATEGORY = "GET_PRODUCTS_FILTERED_BY_CATEGORY";
export const FETCH_RESOURCES_FAILED = "FETCH_RESOURCES_FAILED";

const getDetailProduct = (product) => {
  return {
    type: GET_DETAIL_PRODUCT,
    product
  };
};

const getAllProducts = (products) => {
  return {
    type: GET_ALL_PRODUCTS,
    products
  };
};

const createProduct = (product) => {
  return {
    type: CREATE_PRODUCT,
    product
  };
};

const updateProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
    product
  };
};

const deleteProduct = ({ productDeleted }) => {
  return {
    type: DELETE_PRODUCT,
    productDeleted
  };
};

const setCategoryToProduct = (product) => {
  return {
    type: SET_CATEGORY_TO_PRODUCT,
    product
  };
};

const unsetCategoryToProduct = (product) => {
  return {
    type: UNSET_CATEGORY_TO_PRODUCT,
    product
  };
};

const getProductsFilteredByCategory = (products) => {
  return {
    type: GET_PRODUCTS_FILTERED_BY_CATEGORY,
    products
  };
};

const fetchResourcesFailed = (err) => {
  return {
    type: FETCH_RESOURCES_FAILED,
    err
  };
};

export const getProduct = (id) => {
  return async (dispatch) => {
    try {

      const res = await axios.get(`http://localhost:5000/products/${id}`);

      dispatch(getDetailProduct(res.data));
    } catch (err) {
      dispatch(fetchResourcesFailed(err));
    }
  };
};

export const getProducts = (search) => {
  return async (dispatch) => {
    try {

      const res = await axios.get(`http://localhost:5000/products/${search ? "?search=" + search : ""}`);

      dispatch(getAllProducts(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addProduct = (newProduct) => {
  return async (dispatch) => {
    try {

      const res = await authAxios.post(`http://localhost:5000/products`, { ...newProduct }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      dispatch(createProduct(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const editProduct = (id, updatedProduct) => {
  return async (dispatch) => {
    try {

      const res = await authAxios.put(`http://localhost:5000/products/${id}`, { ...updatedProduct }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      dispatch(updateProduct(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeProduct = (id) => {
  return async (dispatch) => {
    try {

      const res = await authAxios.delete(`http://localhost:5000/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      dispatch(deleteProduct(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addCategoryToProduct = (productId, categoryId) => {
  return async (dispatch) => {
    try {

      const res = await authAxios.post(`http://localhost:5000/products/${productId}/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      dispatch(setCategoryToProduct(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeCategoryToProduct = (productId, categoryId) => {
  return async (dispatch) => {
    try {

      const res = await authAxios.delete(`http://localhost:5000/products/${productId}/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      dispatch(unsetCategoryToProduct(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const filterProductsByCategory = (categoryName) => {
  return async (dispatch) => {
    try {

      const res = await axios.get(`http://localhost:5000/products/category/${categoryName}`);

      dispatch(getProductsFilteredByCategory(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};