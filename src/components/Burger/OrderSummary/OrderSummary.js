import React from "react";
import Aux from "../../../hoc/Auxiliary";

const orderSummary = (props) => {
  const ingredientList = Object.keys(props.ingredient).map((key) => {
    return (
      <li>
        <span> {key}: </span>
        {props.ingredient[key]}
      </li>
    );
  });
  return (
    <Aux>
      <p>Your Delicious burger contain following ingredients : </p>
      <ul>{ingredientList}</ul>
    </Aux>
  );
};

export default orderSummary;
