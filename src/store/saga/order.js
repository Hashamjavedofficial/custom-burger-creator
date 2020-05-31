import { put } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "../../axios";

export function* orderInfoSaga(action) {
  yield put(actions.purchaseBurgerOrder());

  try {
    const response = yield axios.post(
      "/orders.json?auth=" + action.idToken,
      action.orderData
    );
    yield put(actions.orderSuccessful(response.data.name, action.orderData));
  } catch (err) {
    yield put(actions.orderFailed(err));
  }
}
export function* orderGetSaga(action) {
  yield put(actions.orderStart());
  const queryParams = `?auth=${action.idToken}&orderBy="userId"&equalTo="${action.userId}"`;
  try {
    const response = yield axios.get("/orders.json" + queryParams);

    let tempOrders = [];
    for (let i in response.data) {
      tempOrders.push({
        ...response.data[i],
        key: i,
      });
    }
    yield put(actions.orderSuccess(tempOrders));
  } catch (err) {
    yield put(actions.orderFail(err));
  }
}
