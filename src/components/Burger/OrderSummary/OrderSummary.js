import React from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredientList = Object.keys(props.ingredient).map((key) => {
    return (
      <li key={key}>
        <span> {key}: </span>
        {props.ingredient[key]}
      </li>
    );
  });
  return (
    <Aux>
      <p>Your Delicious burger contain following ingredients : </p>
      <ul>{ingredientList}</ul>
      <p>
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Do you want to proceed?</p>
      <Button btnType={"Success"} clicked={props.continue}>
        Continue
      </Button>
      <Button btnType={"Danger"} clicked={props.cancel}>
        Cancel
      </Button>
    </Aux>
  );
};

export default orderSummary;
