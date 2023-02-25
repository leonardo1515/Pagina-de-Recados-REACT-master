import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiAddUser } from "../../api";
import { CreatUserType } from "../types/index";
import { setTestAlert } from "./StatusApiAlertSlice";

export const createUser = createAsyncThunk(
  "user/createUser",
  async (user: CreatUserType, { dispatch }) => {
    try {
      const { data } = await apiAddUser("/user/create", user);
      if (data.ok === true) {
        const { newUser } = data.data;
        dispatch(
          setTestAlert({
            msg: data.message,
            type: "success",
            open: "close",
          })
        );
        return newUser;
      }
      if (data.ok === false) {
        dispatch(
          setTestAlert({
            msg: data.message,
            type: "error",
            open: "close",
          })
        );
        return data.message;
      }
    } catch (data: any) {
      dispatch(
        setTestAlert({
          msg: data.message,
          type: "error",
          open: "close",
        })
      );
      return data.message;
    }
  }
);
const createNewUser = createSlice({
  name: "newUser",
  initialState: null,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const {} = createNewUser.actions;
export default createNewUser.reducer;
