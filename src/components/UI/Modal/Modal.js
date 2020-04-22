import React, { Component } from "react";
import Aux from "../../../hoc/Auxiliary";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  componentDidUpdate() {
    console.log("componentDidUpdatefrom modal");
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }
  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} canceled={this.props.canceled} />

        <div
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
          className={classes.Modal}
        >
          <h3>Your Order</h3>
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
