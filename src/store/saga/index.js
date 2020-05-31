import { takeEvery } from "redux-saga/effects";
import * as actionTypes from "../actions/actionsTypes";
import {
  authLogoutSaga,
  authLogoutCheckerSaga,
  authSaga,
  authCheckStatusSaga,
} from "./auth";
import { initIngredientsSaga } from "./burgerBuilder";
export function* fileWatch() {
  yield takeEvery(actionTypes.AUTH_LOGOUT_INITIATE, authLogoutSaga);
  yield takeEvery(actionTypes.AUTH_LOGOUT_CHECKER, authLogoutCheckerSaga);
  yield takeEvery(actionTypes.AUTH, authSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATUS, authCheckStatusSaga);
  yield takeEvery(actionTypes.INI_INGREDIENTS, initIngredientsSaga);
}
