import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  apiAddMessages,
  apiDeleteMessages,
  apiGetAllMessages,
  apiUpdateMessages,
} from "../../api";
import { AddMessageProps, GetMessageProps } from "../types/index";

const adapter = createEntityAdapter<GetMessageProps>({
  selectId: (item) => item._id,
});

export const { selectAll: selectMessages, selectById } = adapter.getSelectors(
  (state: RootState) => state.MessagsSlice
);

export const getAllMessages = createAsyncThunk(
  "user/getAllmessages",
  async (messages: string) => {
    const result = await apiGetAllMessages(messages);

    if (result.ok) {
      return result.data;
    }

    return [];
  }
);

export const addMesage = createAsyncThunk(
  "user/addMessage",
  async (message: AddMessageProps) => {
    const result = await apiAddMessages({ ...message });
    if (result.ok) {
      return {
        ok: true,
        data: result,
      };
    }

    return {
      ok: false,
    };
  }
);

export const deletMessage = createAsyncThunk(
  "user/deletMessage",
  async (messages: any, { dispatch }) => {
    const result = await apiDeleteMessages(messages.userId, messages.id);
    if (result.ok) {
      return {
        ok: true,
        data: result,
      };
    }

    return {
      ok: false,
    };
  }
);

export const updateMessage = createAsyncThunk(
  "user/editeMessage",
  async (message: any) => {
    const { result } = await apiUpdateMessages(message);
    let changes = {};

    if (result.ok) {
      changes = {
        message: message.message,
        descript: message.descript,
        save: message.save,
      };
    }
    return {
      id: message.idCurrentMessage,
      changes,
    };
  }
);

export const saveMessage = createAsyncThunk(
  "user/saveMessage",
  async (message: any) => {
    const result = await apiUpdateMessages(message);

    let changes = {};

    if (result.ok) {
      changes = {
        message: message.message,
        descript: message.descript,
        save: message.save,
      };
    }
    return {
      id: message.idCurrentMessage,
      changes,
    };
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState: adapter.getInitialState(),
  reducers: {
    addOne: adapter.addOne,
    remove: adapter.removeOne,
    addMany: adapter.addMany,
    updateOne: adapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllMessages.fulfilled,
        (state, action: PayloadAction<GetMessageProps[]>) => {
          adapter.setAll(state, action.payload);
        }
      )
      .addCase(addMesage.fulfilled, (state, action) => {
        const result = action.payload.data.data;
        adapter.setAll(state, result);
      })
      .addCase(deletMessage.fulfilled, (state, action) => {
        if (action.payload.ok === true) {
          const result = action.payload.data;
          adapter.removeOne(state, result!.data);
        }
      })
      .addCase(updateMessage.fulfilled, (state, action) => {});
  },
});

export const { addOne, addMany, updateOne } = messagesSlice.actions;
export default messagesSlice.reducer;
