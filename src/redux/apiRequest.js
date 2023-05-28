import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import { getUserFailed, getUserStart, getUserSuccess } from "./userSlice";

export const loginUser = async (user, dispatch, navigate, accessToken) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/signin", user);
    dispatch(loginSuccess(res.data));
    const accessToken = res.data.token;
    localStorage.setItem("accessToken", accessToken);
    navigate("/");
  } catch (err) {
    dispatch(loginFailed());
  }
};

export const registerUser = async (user, dispatch, navigate, accessToken) => {
  dispatch(registerStart());
  try {
    await axios.post("auth/signup", user, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(registerSuccess());
    navigate("/");
  } catch (err) {
    dispatch(registerFailed());
  }
};

export const getAllUsers = async (accessToken, dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get("https://bookingapiv1.onrender.com/api/users", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailed());
  }
};
