import React from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  console.log(props.show);
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
      </div>
    </Aux>
  );
};

export default React.memo(Modal, (prevProps, nextProps) => {
  console.log(nextProps.show + " prev" + prevProps.show);

  return (
    nextProps.show == prevProps.show && nextProps.children == prevProps.children
  );
});
