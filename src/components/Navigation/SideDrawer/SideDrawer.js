import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary";
const sideDrawer = (props) => {
  let currentClass = [classes["SideDrawer"], classes["Close"]];

  if (props.show) {
    currentClass = [classes["SideDrawer"], classes["Open"]];
  }

  return (
    <Aux>
      <Backdrop show={props.show} canceled={props.clicked} />
      <div className={currentClass.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};
export default sideDrawer;
