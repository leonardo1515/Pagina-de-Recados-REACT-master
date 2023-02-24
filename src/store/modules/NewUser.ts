import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiAddUser } from "../../api";
import { CreatUserType } from "../types/index";

export const createUser = createAsyncThunk(
  "user/createUser",
  async (user: CreatUserType, { dispatch }) => {
    try {
      const { data } = await apiAddUser("/user/create", user);
      if (data.ok === true) {
        const { newUser } = data.data;
        return newUser;
      }
      if (data.ok === false) {
        return data.message;
      }
    } catch (data: any) {
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
