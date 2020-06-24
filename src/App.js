import React, { Suspense, useEffect, lazy } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";

import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Logout from "./container/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

const Checkout = lazy(() => {
  return import("./container/Checkout/Checkout");
});
const Auth = lazy(() => {
  return import("./container/Auth/Auth");
});
const Orders = lazy(() => {
  return import("./container/Orders/Orders");
});

const App = (props) => {
  const { onLoginChecker } = props;
  useEffect(() => {
    onLoginChecker();
  }, [onLoginChecker]);

  let route = (
    <Switch>
      <Route path="/" exact component={BurgerBuilder} />
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Redirect to={"/"} />
    </Switch>
  );
  if (props.isAuth) {
    route = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/orders" render={(props) => <Orders {...props} />} />
        <Route path={"/logout"} component={Logout} />
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Redirect to={"/"} />
      </Switch>
    );
  }
  return (
    <div className="App">
      <Layout>
        <Suspense fallback={"Loading...."}>{route}</Suspense>
      </Layout>
    </div>
  );
};
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
