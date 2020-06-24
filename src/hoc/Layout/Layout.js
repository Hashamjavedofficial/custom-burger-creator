import React, { useState } from "react";
import Aux from "../Auxiliary/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";
const Layout = (props) => {
  const [sideDrawerClosedStatus, setLayoutState] = useState(false);

  const sideDrawerClosedHandler = () => {
    setLayoutState(false);
  };
  const drawerMenuHandler = () => {
    setLayoutState(!sideDrawerClosedStatus);
  };

  return (
    <Aux>
      <Toolbar clicked={drawerMenuHandler} isAuth={props.isAuth} />
      <SideDrawer
        show={sideDrawerClosedStatus}
        clicked={sideDrawerClosedHandler}
        isAuth={props.isAuth}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.idToken !== null,
  };
};
export default connect(mapStateToProps)(Layout);
