import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
];
const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        <strong> Price: {props.price.toFixed(2)} </strong>
      </p>
      {controls.map((control) => (
        <BuildControl
          label={control.label}
          key={control.label}
          added={() => {
            props.ingredientAdded(control.type);
          }}
          removed={() => {
            props.ingredientRemoved(control.type);
          }}
          disabledInfo={props.disabledInfo[control.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={props.purchaseStatus}
        onClick={props.purchasing}
      >
        Order Now
      </button>
    </div>
  );
};

export default buildControls;
