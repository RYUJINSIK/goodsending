// axios 모듈 사용예시

import axios from "./axios";

export const productUpload = async (requestBody) => {
  try {
    const response = await axios.post(`/api/product`, requestBody);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
