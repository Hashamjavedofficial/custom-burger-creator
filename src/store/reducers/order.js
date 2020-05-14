import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  order: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.purchasedInit:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.purchaseBurgerOrder:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.orderSuccessful:
      const newOrder = {
        ...action.orderData,

        id: action.orderId,
      };
      return {
        ...state,
        order: state.order.concat(newOrder),
        purchased: true,
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

export default reducer;
