import { takeEvery } from "redux-saga/effects";
import * as actionTypes from "../actions/actionsTypes";
import { authLogoutSaga } from "./auth";

export function* fileWatch() {
  yield takeEvery(actionTypes.AUTH_LOGOUT_INITIATE, authLogoutSaga);
}
