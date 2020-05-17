import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";
const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem active link={"/"} exact>
      Burger Builder
    </NavigationItem>
    {props.isAuth ? (
      <NavigationItem link={"/orders"}>Check out</NavigationItem>
    ) : null}

    {props.isAuth ? (
      <NavigationItem link={"/logout"}>Logout</NavigationItem>
    ) : (
      <NavigationItem link={"/auth"}>Authentication</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
