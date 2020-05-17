import React, { Component, Suspense } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
// import Checkout from "./container/Checkout/Checkout";
import Orders from "./container/Orders/Orders";
import Auth from "./container/Auth/Auth";
import { Route, Switch, withRouter } from "react-router-dom";
import Logout from "./container/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
const checkoutRoute = React.lazy(() => {
  return import("./container/Checkout/Checkout");
});
class App extends Component {
  componentDidMount() {
    this.props.onLoginChecker();
  }

  render() {
    let route = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={Auth} />
        <Route
          render={() => {
            return <h1>Not found</h1>;
          }}
        />
      </Switch>
    );
    if (this.props.isAuth) {
      route = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/orders" component={Orders} />
          <Route path={"/logout"} component={Logout} />
          <Suspense fallback={<p>Loading .....</p>}>
            <Route path="/checkout" component={checkoutRoute} />
          </Suspense>
          <Route
            render={() => {
              return <h1>Not found</h1>;
            }}
          />
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
