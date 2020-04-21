import React from "react";
import classes from "./Logo.module.css";
import Logo from "../../assets/images/original.png";

const logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img src={Logo} alt="MyBurger" />
    </div>
  );
};
export default logo;
