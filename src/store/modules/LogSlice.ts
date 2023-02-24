import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiLogoffApp,
  apiLogApp,
  apiupdateUser,
  apiDeleteUser,
} from "../../api";
import { DeletUserProps, UpdateUeserProps } from "../../api/types";
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
  async (login: any, options) => {
    const result = await apiLogApp(login);
    return result;
  }
);

export const logoffUser = createAsyncThunk(
  "user/logoffUser",
  async (userId: string) => {
    try {
      const result = await apiLogoffApp(userId);
      return result;
    } catch (data: any) {
      return data.message;
    }
  }
);

export const editeUser = createAsyncThunk(
  "user/editeUser",
  async (user: UpdateUeserProps) => {
    try {
      const result = await apiupdateUser(user);

      let changes = {};

      if (result.ok) {
        changes = {
          name: user.name,
          password: user.password,
        };
      }
      return {
        id: user.id,
        changes,
      };
    } catch (data: any) {
      return data.message;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deletUser",
  async (user: DeletUserProps) => {
    try {
      const result = await apiDeleteUser(user);
      return result;
    } catch (data: any) {
      return data.message;
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
