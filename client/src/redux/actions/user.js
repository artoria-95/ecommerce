import axios from 'axios';

import { clearCart } from './cart';


// Types
export const CREATE_USER = "CREATE_USER";
export const UPDATE_USER = "UPDATE_USER";

export const GET_ALL_USERS = "GET_ALL_USERS";
export const PROMOTE_USER = "PROMOTE_USER";
export const DEGRADE_USER = "DEGRADE_USER";
export const BAN_USER = "BAN_USER";
export const DELETE_USER = "DELETE_USER";
export const PASSWORD_RESET = "PASSWORD_RESET";

export const POST_USER_CART = "POST_USER_CART";
export const DELETE_USER_CART = "DELETE_USER_CART";
export const UPDATE_USER_CART = "UPDATE_USER_CART";

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const AUTO_LOGIN = "AUTO_LOGIN";

export const USER_CHANGE_PASSWORD = "USER_CHANGE_PASSWORD";

export const START_REQUEST = "START_REQUEST";
export const SUCCESS_REQUEST = "SUCCESS_REQUEST";
export const SET_ERROR = "SET_ERROR";


const createUser = (user) => {
  return {
    type: CREATE_USER,
    user
  };
};

const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user
  };
};


const getAllUsers = (user) => {
  return {
    type: GET_ALL_USERS,
    user
  };
};

const promoteUser = (user) => {
  return {
    type: PROMOTE_USER,
    user
  };
};

const degradeUser = (user) => {
  return {
    type: DEGRADE_USER,
    user
  };
};

const banUser = (user) => {
  return {
    type: BAN_USER,
    user
  };
};

const deleteUser = ({ userDeleted }) => {
  return {
    type: DELETE_USER,
    userDeleted
  };
};

const forcePasswordReset = (user) => {
  return {
    type: PASSWORD_RESET,
    user
  };
};


const postUserCart = (userCart) => {
  return {
    type: POST_USER_CART,
    userCart
  };
};

const deleteUserCart = (userId) => {
  return {
    type: DELETE_USER_CART,
    userId
  };
};

const updateUserCart = (id, userCart) => {
  return {
    type: UPDATE_USER_CART,
    id,
    userCart
  };
};


const loginUser = (user) => {
  return {
    type: LOGIN_USER,
    user
  };
};

const logoutUser = (user) => {
  return {
    type: LOGOUT_USER,
    user
  };
};

const autoLoginUser = (user) => {
  return {
    type: AUTO_LOGIN,
    user
  };
};


const userChangePassword = (user) => {
  return {
    type: USER_CHANGE_PASSWORD,
    user
  };
};


const startRequest = () => {
  return {
    type: START_REQUEST
  };
};

const successRequest = () => {
  return {
    type: SUCCESS_REQUEST,
  };
};


const setError = (error) => {
  return {
    type: SET_ERROR,
    error
  };
};


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//instancia de axios para realizar peticiones con headers que contengan el token
export const authAxios = axios.create({
  baseURL: 'http://localhost:5000',
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem("token")}`
  // }
});


export const createNewUser = (newUser) => {
  return async (dispatch) => {
    try {

      const res = await axios.post(`http://localhost:5000/users`, { ...newUser });

      dispatch(createUser(res.data));
      alert(`User ${res.data.firstName} created successfully`);
    } catch (err) {
      console.log(err);
    }
  };
};

export const editUser = (id, updatedUser) => {
  return async (dispatch) => {
    try {

      const res = await authAxios.put(`/users/${id}`, { ...updatedUser },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      dispatch(updateUser(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};


export const getUsers = () => {
  return async (dispatch) => {
    try {

      const res = await authAxios.get(`/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      dispatch(getAllUsers(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const promoteUserRole = (id) => {
  return async (dispatch) => {
    try {
      const res = await authAxios.put(`/auth/promote/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      dispatch(promoteUser(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const degradeUserRole = (id) => {
  return async (dispatch) => {
    try {
      const res = await authAxios.put(`/auth/degrade/${id}`);

      dispatch(degradeUser(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const banUserToOblivion = (id) => {
  return async (dispatch) => {
    try {
      const res = await authAxios.put(`/auth/${id}/ban`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      dispatch(banUser(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeUser = (id) => {
  return async (dispatch) => {
    try {

      const res = await authAxios.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      dispatch(deleteUser(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const passwordReset = (id) => {
  return async (dispatch) => {
    try {
      const res = await authAxios.put(`/users/forcePasswordReset/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      dispatch(forcePasswordReset(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};


export const addUserCart = (userId) => {
  return async (dispatch) => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const token = localStorage.getItem("token");
      const res = await authAxios.post(`/users/${userId}/cart`, { cart }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(postUserCart(res.data));
      if (localStorage.getItem('cart')) localStorage.removeItem('cart');
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeUserCart = (userId) => {
  return async (dispatch) => {
    try {

      const res = await authAxios.delete(`/users/${userId}/cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      dispatch(deleteUserCart(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const editUserCart = (id, userCart) => {
  return async (dispatch) => {
    try {

      const res = await authAxios.put(`/users/${id}/cart`, { ...userCart }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      dispatch(updateUserCart(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};


export const logInUser = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(startRequest());
      const res = await axios.post(`http://localhost:5000/auth/login`, { ...email, ...password });
      const { token, user } = res.data;

      dispatch(loginUser(user));
      localStorage.setItem("token", token);
      dispatch(addUserCart(user.id));
      dispatch(successRequest());
    } catch (err) {
      alert(err.response.data) 
      dispatch(setError(err));
    }
  };
};

export const logOutUser = () => {
  return async (dispatch) => {
    try {
      await axios.get(`http://localhost:5000/auth/logout`);
      dispatch(logoutUser());
      dispatch(clearCart());
      localStorage.clear();
    }
    catch (err) {
      console.log(err);
    }
  };
};

export const autoSignInUser = (token) => {
  return async (dispatch) => {
    try {
      dispatch(startRequest());
      const res = await authAxios.get(`/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const user = res.data;
      dispatch(autoLoginUser(user));
     // dispatch(addUserCart(user.id));
      dispatch(successRequest());
    } catch (err) {
      console.log(err);
      dispatch(setError(err));
    }
  };
};


export const changePassword = (password) => {
  return async (dispatch) => {
    try {
      const res = await authAxios.post(`/users/passwordReset`, { password }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      dispatch(userChangePassword(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};
