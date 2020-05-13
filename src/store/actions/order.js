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
export const orderInfo = (orderData) => {
  return (dispatch) => {
    {
      dispatch(actionTypes.purchaseBurgerOrder());
      axios
        .post("/orders.json", orderInfo)
        .then((response) => {
          console.log("{Order data}", orderData);
          console.log("[response data]", response.data);
          dispatch(orderSuccessful(response.data, orderData));
        })
        .catch((err) => {
          dispatch(orderFailed(err));
        });
    }
  };
};
