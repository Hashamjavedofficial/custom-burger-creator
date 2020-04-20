import React from "react";
import Aux from "../../../hoc/Auxiliary";
import classes from "./Modal.module.css";

const modal = (props) => {
  return (
    <div
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0",
      }}
      className={classes.Modal}
    >
      <h3>Your Order</h3>
      {props.children}
    </div>
  );
};

export default modal;
