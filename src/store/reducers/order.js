import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "./utility";
const initialState = {
  order: [],
  loading: false,
  purchased: false,
};
const orderSuccess = (state, action) => {
  return updateObject(state, {
    order: action.orders,
    loading: false,
  });
};
const orderSuccessful = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    order: state.order.concat(newOrder),
    purchased: true,
    loading: false,
  });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_START:
      return updateObject(state, { loading: true });
    case actionTypes.ORDER_SUCCESS:
      return orderSuccess(state, action);
    case actionTypes.ORDER_FAIL:
      return updateObject(state, { loading: false });
    case actionTypes.purchasedInit:
      return updateObject(state, { purchased: false });
    case actionTypes.purchaseBurgerOrder:
      return updateObject(state, { loading: true });
    case actionTypes.orderSuccessful:
      return orderSuccessful(state, action);
    case actionTypes.orderFailed:
      return updateObject(state, { loading: false });
    default:
      return state;
  }
};
export default reducer;
