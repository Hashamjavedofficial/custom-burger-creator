import React, { Component } from "react";
import Aux from "../Auxiliary/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";
class Layout extends Component {
  state = {
    sideDrawerClosedStatus: false,
  };
  sideDrawerClosedHandler = () => {
    this.setState({
      sideDrawerClosedStatus: false,
    });
  };
  drawerMenuHandler = () => {
    this.setState((prevState, props) => {
      return {
        sideDrawerClosedStatus: !prevState.sideDrawerClosedStatus,
      };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar clicked={this.drawerMenuHandler} isAuth={this.props.isAuth} />
        <SideDrawer
          show={this.state.sideDrawerClosedStatus}
          clicked={this.sideDrawerClosedHandler}
          isAuth={this.props.isAuth}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.idToken !== null,
  };
};
export default connect(mapStateToProps)(Layout);
