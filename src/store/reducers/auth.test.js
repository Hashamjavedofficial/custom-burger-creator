import reducer from "./auth";
import * as actionTypes from "../actions/actionsTypes";

describe("Testing the redux", () => {
  it("for initialState", () => {
    expect(reducer(undefined, "")).toEqual({
      userId: null,
      idToken: null,
      error: null,
      loading: false,
      path: "/",
    });
  });
  it("for start action", () => {
    expect(
      reducer(
        {
          userId: null,
          idToken: null,
          error: null,
          loading: true,
          path: "/",
        },
        { type: actionTypes.AUTH_START }
      )
    ).toEqual({
      userId: null,
      idToken: null,
      error: null,
      loading: true,
      path: "/",
    });
  });

  it("for auth-success", () => {
    expect(
      reducer(
        {
          userId: null,
          idToken: null,
          error: null,
          loading: false,
          path: "/",
        },
        { type: actionTypes.AUTH_SUCCESS, userId: "tttt", idToken: "mocha" }
      )
    ).toEqual({
      userId: "tttt",
      idToken: "mocha",
      error: null,
      loading: false,
      path: "/",
    });
  });
});
