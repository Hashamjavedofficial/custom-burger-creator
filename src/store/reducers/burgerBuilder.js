import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "./utility";
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
  burger: false,
};

const addIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
    },
    totalPrice: parseFloat(
      state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
    ).toFixed(2),
    burger: true,
  });
};
const removeIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
    },
    totalPrice: parseFloat(
      state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
    ).toFixed(2),
    burger: true,
  });
};
const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 4,
    error: false,
    burger: false,
  });
};
const burgerBuilder = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.addIngredients:
      return addIngredients(state, action);
    case actionTypes.removeIngredients:
      return removeIngredients(state, action);
    case actionTypes.setIngredients:
      return setIngredients(state, action);
    case actionTypes.setIngredientsFailed:
      return updateObject(state, { error: true });
    default:
      return state;
  }
};
export default burgerBuilder;
