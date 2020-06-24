import React from "react";
import classes from "./DrawToggler.module.css";
const drawerToggler = (props) => {
  return (
    <div onClick={props.clicked} className={classes.DrawerToggle}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default drawerToggler;
