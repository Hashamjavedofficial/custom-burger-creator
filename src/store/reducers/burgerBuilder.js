import * as actionTypes from "../actions/actionsTypes";
const INGREDIENT_PRICE = {
  salad: 0.4,
  cheese: 0.5,
  bacon: 0.8,
  meat: 1.5,
};
const initialState = {
  ingredients: {
    salad: 0,
    meat: 0,
    cheese: 0,
    bacon: 0,
  },
  totalPrice: 4,
};

const burgerBuilder = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.addIngredients:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
      };
    case actionTypes.removeIngredients:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
      };
    default:
      return state;
  }
};

export default burgerBuilder;
