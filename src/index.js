import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import burgerBuilder from "./store/reducers/burgerBuilder";
import order from "./store/reducers/order";
import authReducer from "./store/reducers/auth";
import thunk from "redux-thunk";
import createReduxSagaMiddleware from "redux-saga";
import { fileWatch, burgerBuilderWatch, orderWatch } from "./store/saga/index";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;
const rootReducer = combineReducers({
  burgerBuilder: burgerBuilder,
  order: order,
  auth: authReducer,
});
const sagaMiddleware = createReduxSagaMiddleware();
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);
sagaMiddleware.run(fileWatch);
sagaMiddleware.run(burgerBuilderWatch);
sagaMiddleware.run(orderWatch);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/my-app/">
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);

serviceWorker.unregister();
