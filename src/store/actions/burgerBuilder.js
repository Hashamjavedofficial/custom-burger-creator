import * as actionType from "./actionsTypes";

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
