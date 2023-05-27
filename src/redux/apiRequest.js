import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import { getUserFaliled, getUserStart, getUserSuccess } from "./userSlice";

export const loginUser = async (user, dispatch, navigate, accessToken) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/signin", user, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(loginSuccess(res));
    navigate("/");
  } catch (err) {
    dispatch(loginFailed);
  }
};

export const registerUser = async (user, dispatch, navigate, accessToken) => {
  dispatch(registerStart());
  try {
    await axios.post("auth/signup", user);
    dispatch(registerSuccess());
    navigate("/");
  } catch (err) {
    dispatch(registerFailed());
  }
};

export const getAllUsers = async (accessToken, dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get("/users", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFaliled());
  }
};
