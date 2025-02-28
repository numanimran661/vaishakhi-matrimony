import axios from "axios";
import axiosInstance from "../axiosInstance";

export const getNewUsers = async () => {
  try {
    const response = await axiosInstance.get("/user/newUsers");
    return response; // Return full response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
export const getMatchUsers = async () => {
  try {
    const response = await axiosInstance.get("/user/userMatch");
    return response; // Return full response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
export const sendInterest = async (formData: any) => {
  try {
    const response = await axiosInstance.post("/user/sendInterest", formData);
    return response; // Return full response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
