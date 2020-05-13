import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  order: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.purchaseBurgerOrder:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.orderSuccessful:
      const newOrder = {
        ...action.orderData,
        id: orderId,
      };
      return {
        ...state,
        order: state.order.concat(newOrder),
        loading: false,
      };
    case actionTypes.orderFailed:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
