import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredients";
import { withRouter } from "react-router-dom";
const burger = (props) => {
  const transformedIngredients = Object.keys(props.ingredients).map((key) => {
    return [...Array(props.ingredients[key])].map((_, index) => {
      return <BurgerIngredient type={key} key={key + index} />;
    });
  });
  let Ingredients = transformedIngredients.reduce((acc, curr) => {
    return acc.concat(curr);
  }, []);
  if (Ingredients.length <= 0) {
    Ingredients = <p>Please add starting the Ingredients</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {Ingredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
export default withRouter(burger);
