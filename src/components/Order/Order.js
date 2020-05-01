import React from "react";
import classes from "./Order.module.css";
const order = (props) => {
  let ingredients = [];
  for (let i in props.ingredients) {
    ingredients.push(i + " : " + props.ingredients[i] + " ");
  }
  return (
    <div className={classes.Order}>
      <p>{ingredients.join("")}</p>
      <p>
        Price <strong>{props.totalPrice} USD</strong>
      </p>
    </div>
  );
};
export default order;
