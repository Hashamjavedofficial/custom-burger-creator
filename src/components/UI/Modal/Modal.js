import React from "react";
import Aux from "../../../hoc/Auxiliary";
import classes from "./Modal.module.css";

const modal = (props) => {
  return <div className={classes.Modal}>{props.children}</div>;
};

export default modal;
