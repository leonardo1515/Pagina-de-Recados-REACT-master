import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiLogoffApp,
  apiLogApp,
  apiupdateUser,
  apiDeleteUser,
} from "../../api";
import { DeletUserProps, UpdateUeserProps } from "../../api/types";
import { setTestAlert } from "./StatusApiAlertSlice";
export type GetUser = {
  id: string;
  name: string;
  email: string;
  status: boolean;
  password: string;
  message?: [];
};
const initialState: GetUser = {
  id: "",
  name: "",
  email: "",
  status: false,
  password: "",
};

export const logUser = createAsyncThunk(
  "auth/login",
  async (login: any, { dispatch }) => {
    const result = await apiLogApp(login);
    if (result.ok === false) {
      dispatch(
        setTestAlert({
          msg: result.message,
          type: "error",
          open: "close",
        })
      );
    }
    dispatch(
      setTestAlert({
        msg: result.message,
        type: "success",
        open: "close",
      })
    );
    return result;
  }
);

export const logoffUser = createAsyncThunk(
  "user/logoffUser",
  async (userId: string, { dispatch }) => {
    try {
      const result = await apiLogoffApp(userId);
      if (result.ok === false) {
        dispatch(
          setTestAlert({
            msg: result.message,
            type: "error",
            open: "close",
          })
        );
      }

      dispatch(
        setTestAlert({
          msg: result.message,
          type: "success",
          open: "close",
        })
      );

      return result;
    } catch (data: any) {
      return data.message;
    }
  }
);

export const editeUser = createAsyncThunk(
  "user/editeUser",
  async (user: UpdateUeserProps, { dispatch }) => {
    try {
      const result = await apiupdateUser(user);
      let changes = {};

      if (result.ok) {
        changes = {
          name: user.name,
          password: user.password,
        };
        dispatch(
          setTestAlert({
            msg: result.message,
            type: "success",
            open: "close",
          })
        );
      }
      return {
        id: user.id,
        changes,
      };
    } catch (result: any) {
      dispatch(
        setTestAlert({
          msg: result.message,
          type: "error",
          open: "close",
        })
      );
      return result.message;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deletUser",
  async (user: DeletUserProps, { dispatch }) => {
    try {
      const result = await apiDeleteUser(user);
      if (result.ok === false) {
        dispatch(
          setTestAlert({
            msg: result.message,
            type: "error",
            open: "close",
          })
        );
      }
      dispatch(
        setTestAlert({
          msg: result.message,
          type: "success",
          open: "close",
        })
      );
      return result;
    } catch (result: any) {
      dispatch(
        setTestAlert({
          msg: result.message,
          type: "error",
          open: "close",
        })
      );
      return result.message;
    }
  }
);

const logSlice = createSlice({
  name: "logUser",
  initialState: initialState,
  reducers: {
    updateuser(state, action) {
      state.name = action.payload.name;
      state.password = action.payload.password;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(logUser.fulfilled, (state, action) => {
        const result = action.payload;

        if (result.ok) {
          return result.data;
        }
      })
      .addCase(logoffUser.fulfilled, (state, action) => {
        state.status = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        return initialState;
      })
      .addCase(editeUser.fulfilled, (state, action) => {});
  },
});
export const { updateuser } = logSlice.actions;
export default logSlice.reducer;
