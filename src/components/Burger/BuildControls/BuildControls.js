import React from "react";
import classes from "./BuidControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import { element } from "prop-types";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
];
const buildControls = (props) => {
  return (
    <div className={classes}>
      {controls.map((element) => (
        <BuildControl label={element.label} key={element.label} />
      ))}
    </div>
  );
};

export default buildControls;
