import { AxiosHelper } from "./AxiosHelper";
import axios from "axios";

export const createRoomApi = async (roomId, signal) => {
  try {
    const response = await AxiosHelper.post(
      `/api/v1/rooms`,
      { roomId },
      { signal } // Pass the signal here
    );
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled", error.message);
      throw new Error("Request canceled");
    }
    throw error; // Re-throw other errors
  }
};

export const joinRoomApi = async (roomId, signal) => {
  try {
    const response = await AxiosHelper.get(`/api/v1/rooms/${roomId}`, {
      signal, // Pass the signal here
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled", error.message);
      throw new Error("Request canceled");
    }
    throw error; // Re-throw other errors
  }
};

export const loadMessagesApi = async (roomId, signal, page = 0, size = 20) => {
  try {
    const response = await AxiosHelper.get(
      `/api/v1/rooms/${roomId}/messages?page=${page}&size=${size}`,
      {
        signal, // Pass the signal here
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled", error.message);
      throw new Error("Request canceled");
    }
    throw error; // Re-throw other errors
  }
};
