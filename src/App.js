import React, { Component, Suspense } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
// import Checkout from "./container/Checkout/Checkout";
import Orders from "./container/Orders/Orders";
import Auth from "./container/Auth/Auth";
import { Route, Switch } from "react-router-dom";
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
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
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
        </Layout>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onLoginChecker: () => dispatch(actions.authCheckStatus()),
  };
};
export default connect(null, mapDispatchToProps)(App);
