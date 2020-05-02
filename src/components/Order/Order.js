import React from "react";
import classes from "./Order.module.css";
const order = (props) => {
  const ingredients = [];
  for (let i in props.ingredients) {
    ingredients.push(
      <span
        key={i}
        style={{
          textTransform: "capitalize",
          border: "1px solid black",
          display: "inline-block",
          margin: "0 8px 8px",
          padding: "5px",
        }}
      >
        {i + " : " + props.ingredients[i] + " "}
      </span>
    );
  }
  const orderIngredients = ingredients.map((ingredient) => {
    return ingredient;
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {orderIngredients}</p>
      <p>
        Price <strong>{props.totalPrice} USD</strong>
      </p>
    </div>
  );
};
export default order;
