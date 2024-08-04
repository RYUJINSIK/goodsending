// axios 모듈 사용예시

import axios from "./axios";

export const getUserData = async (requestBody) => {
  try {
    const response = await axios.post(`/api/members/login`, requestBody);
    console.log(response);
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
    console.error(error);
    throw error;
  }
};

export const codeCheck = async (email, code) => {
  try {
    const response = await axios.get(
      `/api/members/checkCode?email=${email}&code=${code}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signup = async (requestBody) => {
  try {
    const response = await axios.post(`/api/members/signup`, requestBody);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
