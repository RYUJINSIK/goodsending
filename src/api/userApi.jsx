// axios 모듈 사용예시

import axios from "./axios";

export const getUserData = async (requestBody) => {
  try {
    const response = await axios.post(`/api/members/login`, requestBody);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const updateUserInfo = (userId, data) => {
  return axios.put(`/users/${userId}`, data);
};

// 회원가입시 메일로 인증코드받는 API
export const getEmailCode = async (requestBody) => {
  try {
    const response = await axios.post(`/api/members/sendMail`, requestBody);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
