import axios from 'axios';
import { getAllOrders, removeOrder, getOrderById } from '../../services/orders';
import { authAxios } from './user';

const USER_ORDERS = "USER_ORDERS";
const ADD_PRODUCT_TO_SHOPPINGCART = 'ADD_PRODUCT_TO_SHOPPINGCART';
const SET_SHOPPINGCART = 'SET_SHOPPINGCART';
const GET_ALL_ORDERS = 'GET_ALL_ORDERS';
const RESET_STATE = 'RESET_STATE';
const REMOVE_ORDER = 'REMOVE_ORDER';
const HANDLE_VIEW_ORDER = 'HANDLE_VIEW_ORDER';
const GET_ORDER_DETAIL = 'GET_ORDER_DETAIL';
const DISABLED_CRUD = 'DISABLED_CRUD';
const SET_ORDER_STATUS = 'SET_ORDER_STATUS';

export const setOrderStatus = (id, name, price, amount) => {
  return {
    type: SET_ORDER_STATUS,
    payload: {
      id,
      name,
      price,
      amount,
    },
  };
};


export const addProductToShoppingCart = (id, name, price, amount) => {
  return {
    type: ADD_PRODUCT_TO_SHOPPINGCART,
    payload: {
      id,
      name,
      price,
      amount,
    },
  };
};

export const setShoppingCart = (shoppingCart) => {
  return {
    type: SET_SHOPPINGCART,
    payload: shoppingCart,
  };
};

export const getOrder = (id) => {
  return async (dispatch) => {
    try {

      const res = await axios.get(`http://localhost:5000/orders/${id}`);

      console.log(res.data);

      dispatch({
        type: GET_ORDER_DETAIL,
        order: res.data
      });
    } catch (err) {
      return err;
    }
  };
};

export const getAllOrdersAction = () => {
  return async (dispatch) => {
    try {

      const res = await axios.get(`http://localhost:5000/orders/`);
      console.log('res', res.data);
      const data = res.data;
      dispatch({
        type: GET_ALL_ORDERS,
        payload: data
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getUserOrders = (id) => {
  return async (dispatch) => {
    try {

      const res = await authAxios.get(`/users/${id}/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      dispatch({
        type: USER_ORDERS,
        payload: res.data
      });
    } catch (err) {
      return err;
    }
  };
};

export const removeOrderAction = (id) => {
  return (dispatch) => {
    dispatch({
      type: RESET_STATE,
    });
    return removeOrder(id)
      .then((data) => {
        dispatch({
          type: REMOVE_ORDER,
          payload: data
        });
      });
  };
};

export const handleViewOrder = (id) => {
  return dispatch => {
    dispatch(getOrderDetail(id))
      .then(() => {
        dispatch({
          type: HANDLE_VIEW_ORDER
        });
      });
  };
};

export const getOrderDetail = (id) => {
  return dispatch => {
    return getOrderById(id)
      .then(data => {
        dispatch({
          type: GET_ORDER_DETAIL,
          order: data
        });
      });
  };
};

export const disabledCrud = () => {
  return {
    type: DISABLED_CRUD
  };
};

export const sendReviewEmail = (id, user, status) => {

  return axios
    .post(`http://localhost:5000/email/${id}`, { user, status })
    .then(res => {
      return res.data;
    })
    .catch(() => {
      return undefined;
    });
};

export const putOrderStatus = async (id, status) => {

  return axios.put(`http://localhost:5000/orders/${id}/${status}`)

    .catch(() => {
      return undefined;
    });   //dispatch getAllOrders ! ! !;
};