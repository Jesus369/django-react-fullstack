import axios from "axios";
import { returnErrors } from "./messages";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from "./types";

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // Pulls USER_LOADING action.type from auth reducers
  dispatch({ type: USER_LOADING });

  // Get Token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "content-type": "application/json"
    }
  };

  if (token) {
    // Adding Authorization to the headers
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .get("api/auth/user", config)
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

export const login = (username, password) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body
  const body = JSON.stringify({ username, password });
  console.log(body);
  axios
    .post("/api/auth/login", body, config)
    .then(res => {
      console.log(res);
      console.log(res.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL
      });
    });
};
