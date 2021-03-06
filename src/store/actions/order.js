import * as actionTypes from "../actions/actionsTypes";
import axios from "../../axios";

export const orderSuccessful = (orderId, orderData) => {
  return {
    type: actionTypes.orderSuccessful,
    orderId: orderId,
    orderData: orderData,
  };
};
export const orderFailed = (error) => {
  return {
    type: actionTypes.orderFailed,
    error: error,
  };
};
export const purchaseBurgerOrder = () => {
  return {
    type: actionTypes.purchaseBurgerOrder,
  };
};
export const orderInfo = (orderData, idToken) => {
  // return (dispatch) => {
  //   {
  //     dispatch(purchaseBurgerOrder());
  //     axios
  //       .post("/orders.json?auth=" + idToken, orderData)
  //       .then((response) => {
  //         dispatch(orderSuccessful(response.data.name, orderData));
  //       })
  //       .catch((err) => {
  //         dispatch(orderFailed(err));
  //       });
  //   }
  // };
  return {
    type: actionTypes.ORDER_INFO,
    orderData,
    idToken,
  };
};

export const purchasedInit = () => {
  return {
    type: actionTypes.purchasedInit,
  };
};

export const orderStart = () => {
  return {
    type: actionTypes.ORDER_START,
  };
};
export const orderSuccess = (orders) => {
  return {
    type: actionTypes.ORDER_SUCCESS,
    orders: orders,
  };
};
export const orderFail = (error) => {
  return {
    type: actionTypes.ORDER_FAIL,
    error,
  };
};
export const orderGet = (idToken, userId) => {
  return {
    type: actionTypes.GET_ORDERS,
    idToken,
    userId,
  };
};
