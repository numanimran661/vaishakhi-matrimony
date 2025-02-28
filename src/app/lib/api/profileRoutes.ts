import axios from "axios";
import axiosInstance from "../axiosInstance";

export const getUserProfile = async () => {
    try {
      const response = await axiosInstance.get("/user/profile");
  
      return response; // Return full response
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response;
      }
      throw error;
    }
  };