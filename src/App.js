import React, { Component, Suspense } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
// import Checkout from "./container/Checkout/Checkout";
import Orders from "./container/Orders/Orders";
import Auth from "./container/Auth/Auth";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Logout from "./container/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import Checkout from "./container/Checkout/Checkout";
import asyncComponent from "./hoc/LazyLoading/asyncComponent";

const asyncCheckout = asyncComponent(() => {
  return import("./container/Checkout/Checkout");
});
const asyncAuth = asyncComponent(() => {
  return import("./container/Auth/Auth");
});
const asyncOrders = asyncComponent(() => {
  return import("./container/Orders/Orders");
});
class App extends Component {
  componentDidMount() {
    this.props.onLoginChecker();
  }

  render() {
    let route = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={asyncAuth} />
        <Redirect to={"/"} />
      </Switch>
    );
    if (this.props.isAuth) {
      route = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/orders" component={asyncOrders} />
          <Route path={"/logout"} component={Logout} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/auth" component={asyncAuth} />
          <Redirect to={"/"} />
        </Switch>
      );
    }

    return (
      <div className="App">
        <Layout>{route}</Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.idToken !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLoginChecker: () => dispatch(actions.authCheckStatus()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
