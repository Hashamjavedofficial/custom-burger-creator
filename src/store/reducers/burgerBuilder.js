import * as actionTypes from "../actions/actionsTypes";
const INGREDIENT_PRICE = {
  salad: 0.4,
  cheese: 0.5,
  bacon: 0.8,
  meat: 1.5,
};
const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
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
    case actionTypes.setIngredients:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        error: false,
      };
    case actionTypes.setIngredientsFailed:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default burgerBuilder;
