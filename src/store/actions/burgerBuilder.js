import * as actionType from "./actionsTypes";
import axios from "../../axios";

export const addIngredient = (ingredientName) => {
  return {
    type: actionType.addIngredients,
    ingredientName: ingredientName,
  };
};
export const removeIngredient = (ingredientName) => {
  return {
    type: actionType.removeIngredients,
    ingredientName: ingredientName,
  };
};
export const setIngredients = (ingredients) => {
  return {
    type: actionType.setIngredients,
    ingredients: ingredients,
  };
};
export const setIngredientsError = () => {
  return {
    type: actionType.setIngredientsFailed,
  };
};
export const initIngredients = () => {
  return {
    type: actionType.INI_INGREDIENTS,
  };
};
