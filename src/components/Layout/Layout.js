import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    sideDrawerClosedStatus: false,
  };

  sideDrawerClosedHandler = () => {
    console.log("hit");
    this.setState({
      sideDrawerClosedStatus: false,
    });
  };
  drawerMenuHandler = () => {
    this.setState((prevState, props) => {
      console.log(prevState);
      console.log(props);
      return {
        sideDrawerClosedStatus: !prevState.sideDrawerClosedStatus,
      };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar clicked={this.drawerMenuHandler} />
        <SideDrawer
          show={this.state.sideDrawerClosedStatus}
          clicked={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
