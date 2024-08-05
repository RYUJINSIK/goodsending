// axios 모듈 사용예시

import axios from "./axios";

export const getLoginToken = async (requestBody) => {
  try {
    const response = await axios.post(`/api/members/login`, requestBody);
    return response.headers.authorization;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getUserInfo = (token) => {
  try {
    const response = axios.get(`/api/members/info`, {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    console.log("ERROR");
    throw error;
  }
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
