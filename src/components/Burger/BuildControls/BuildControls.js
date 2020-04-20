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
        />
      ))}
    </div>
  );
};

export default buildControls;
