import * as actionTypes from "../actions/actionsTypes";
import axios from "../../axios";

const orderSuccessful = (orderId, orderData) => {
  return {
    type: actionTypes.orderSuccessful,
    orderId: orderId,
    orderData: orderData,
  };
};
const orderFailed = (error) => {
  return {
    type: actionTypes.orderFailed,
    error: error,
  };
};
const purchaseBurgerOrder = () => {
  return {
    type: actionTypes.purchaseBurgerOrder,
  };
};
export const orderInfo = (orderData, idToken) => {
  return (dispatch) => {
    {
      dispatch(purchaseBurgerOrder());
      axios
        .post("/orders.json?auth=" + idToken, orderData)
        .then((response) => {
          dispatch(orderSuccessful(response.data.name, orderData));
        })
        .catch((err) => {
          dispatch(orderFailed(err));
        });
    }
  };
};

export const purchasedInit = () => {
  return {
    type: actionTypes.purchasedInit,
  };
};

const orderStart = () => {
  return {
    type: actionTypes.ORDER_START,
  };
};
const orderSuccess = (orders) => {
  return {
    type: actionTypes.ORDER_SUCCESS,
    orders: orders,
  };
};
const orderFail = (error) => {
  return {
    type: actionTypes.ORDER_FAIL,
    error: error,
  };
};
export const orderGet = (idToken, userId) => {
  return (dispatch) => {
    dispatch(orderStart());
    const queryParams = `?auth=${idToken}&orderBy="userId"&equalTo="${userId}"`;
    axios
      .get("/orders.json" + queryParams)
      .then((response) => {
        let tempOrders = [];
        for (let i in response.data) {
          tempOrders.push({
            ...response.data[i],
            key: i,
          });
        }
        dispatch(orderSuccess(tempOrders));
      })
      .catch((err) => {
        dispatch(orderFail(err));
      });
  };
};
