import { put } from "redux-saga/effects";
import * as actionTypes from "../actions/actionsTypes";

export function* authLogoutSaga() {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("userId");
  yield localStorage.removeItem("expireTime");
  yield put({
    type: actionTypes.AUTH_LOGOUT,
  });
}
