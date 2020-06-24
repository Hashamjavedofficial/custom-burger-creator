import { takeEvery, all, takeLatest } from "redux-saga/effects";
import * as actionTypes from "../actions/actionsTypes";
import {
  authLogoutSaga,
  authLogoutCheckerSaga,
  authSaga,
  authCheckStatusSaga,
} from "./auth";
import { initIngredientsSaga } from "./burgerBuilder";
import { orderInfoSaga, orderGetSaga } from "./order";
export function* fileWatch() {
  yield all([
    takeEvery(actionTypes.AUTH_LOGOUT_INITIATE, authLogoutSaga),
    takeEvery(actionTypes.AUTH_LOGOUT_CHECKER, authLogoutCheckerSaga),
    takeEvery(actionTypes.AUTH, authSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATUS, authCheckStatusSaga),
  ]);
}

export function* burgerBuilderWatch() {
  yield takeEvery(actionTypes.INI_INGREDIENTS, initIngredientsSaga);
}
export function* orderWatch() {
  yield takeLatest(actionTypes.ORDER_INFO, orderInfoSaga);
  yield takeEvery(actionTypes.GET_ORDERS, orderGetSaga);
}
