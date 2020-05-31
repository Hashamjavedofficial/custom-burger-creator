import { takeEvery } from "redux-saga/effects";
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
  yield takeEvery(actionTypes.AUTH_LOGOUT_INITIATE, authLogoutSaga);
  yield takeEvery(actionTypes.AUTH_LOGOUT_CHECKER, authLogoutCheckerSaga);
  yield takeEvery(actionTypes.AUTH, authSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATUS, authCheckStatusSaga);
  yield takeEvery(actionTypes.INI_INGREDIENTS, initIngredientsSaga);
  yield takeEvery(actionTypes.ORDER_INFO, orderInfoSaga);
  yield takeEvery(actionTypes.GET_ORDERS, orderGetSaga);
}
