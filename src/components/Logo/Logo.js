import React from "react";
import classes from "./Logo.module.css";
import Logo from "../../assets/images/original.png";
import { Link } from "react-router-dom";

const logo = (props) => {
  return (
    <div className={classes.Logo}>
      <Link to="/">
        <img src={Logo} alt="MyBurger" />
      </Link>
    </div>
  );
};
export default logo;
