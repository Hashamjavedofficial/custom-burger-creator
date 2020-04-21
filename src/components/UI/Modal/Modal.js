import React from "react";
import Aux from "../../../hoc/Auxiliary";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Button from "../Button/Button";

const modal = (props) => {
  return (
    <Aux>
      <Backdrop show={props.show} canceled={props.canceled} />

      <div
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
        className={classes.Modal}
      >
        <h3>Your Order</h3>
        {props.children}
        <p>Do you want to proceed?</p>
      </div>
    </Aux>
  );
};

export default modal;
