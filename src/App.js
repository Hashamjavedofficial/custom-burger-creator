import React, { Component, Suspense } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
// import Checkout from "./container/Checkout/Checkout";
import Orders from "./container/Orders/Orders";
import { Route, Switch } from "react-router-dom";
const checkoutRoute = React.lazy(() => {
  return import("./container/Checkout/Checkout");
});
class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/orders" component={Orders} />
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

export default App;
