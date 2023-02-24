import axios, { AxiosResponse } from "axios";
import { AddMessageProps } from "../store/types";
import {
  ApiResponse,
  DeletUserProps,
  UpdateMessageProps,
  UpdateUeserProps,
} from "./types";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const apiAddUser = async (url: string, data: any) => {
  const response: AxiosResponse = await axios.post(url, data);
  return response;
};

const apiupdateUser = async (
  userUpdate: UpdateUeserProps
): Promise<ApiResponse> => {
  try {
    const result = await axios.put(`/user/${userUpdate.id}/update`, userUpdate);
    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      return JSON.parse(error.request?.response);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

const apiDeleteUser = async (
  deletUser: DeletUserProps
): Promise<ApiResponse> => {
  try {
    const result = await axios.delete(`/user/${deletUser.id}/delete`);
    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      return JSON.parse(error.request?.response);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

const apiLogApp = async (login: any): Promise<ApiResponse> => {
  try {
    const result = await axios.post("/user/log", login);
    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      return JSON.parse(error.request?.response);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

const apiLogoffApp = async (userId: string) => {
  try {
    const result = await axios.put(`user/${userId}/logoff`);
    return result.data;
  } catch (error: any) {
    console.log(error);
    if (error.request?.response) {
      return JSON.parse(error.request?.response);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

const apiAddMessages = async (message: AddMessageProps) => {
  try {
    const result = await axios.post(
      `user/${message.userId}/messages/create`,
      message
    );

    return result.data;
  } catch (error: any) {
    console.log(error);
    if (error.request?.response) {
      return JSON.parse(error.request?.response);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

const apiGetAllMessages = async (messages: string): Promise<ApiResponse> => {
  try {
    const result = await axios.get(`user/${messages}/messages`);

    return result.data;
  } catch (error: any) {
    console.log(error);
    if (error.request?.response) {
      return JSON.parse(error.request?.response);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

const apiDeleteMessages = async (
  userId: string,
  id: string
): Promise<ApiResponse> => {
  try {
    const result = await axios.delete(`user/${userId}/messages/${id}/delete`);

    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      return JSON.parse(error.request?.response);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

const apiUpdateMessages = async (message: UpdateMessageProps) => {
  try {
    const result = await axios.put(
      `/user/${message.userId}/messages/${message.id}/update`,
      message
    );
    return result.data;
  } catch (error: any) {
    console.log(error);
    if (error.request?.response) {
      return JSON.parse(error.request?.response);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export {
  apiAddUser,
  apiLogApp,
  apiLogoffApp,
  apiupdateUser,
  apiDeleteUser,
  apiAddMessages,
  apiGetAllMessages,
  apiDeleteMessages,
  apiUpdateMessages,
};
