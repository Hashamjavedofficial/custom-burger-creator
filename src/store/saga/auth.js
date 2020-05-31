import { put, delay } from "redux-saga/effects";
import * as actions from "../actions/index";
import * as actionTypes from "../actions/actionsTypes";

export function* authLogoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("userId");
  yield localStorage.removeItem("expireTime");
  yield put(actions.authLogoutSuccess());
}
export function* authLogoutCheckerSaga(action) {
  yield delay(action.timer);
  yield put(actions.authLogout());
}
