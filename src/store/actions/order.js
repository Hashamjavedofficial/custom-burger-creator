import * as actionTypes from "../actions/actionsTypes";
import axios from "../../axios";
import { orderFailed } from "../actions/actionsTypes";

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
export const orderInfo = (orderData) => {
  return (dispatch) => {
    {
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
