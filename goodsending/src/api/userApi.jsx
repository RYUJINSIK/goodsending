// axios 모듈 사용예시

import axios from "./axios";

export const getUserInfo = (userId) => {
  return axios.get(`/users/${userId}`);
};

export const updateUserInfo = (userId, data) => {
  return axios.put(`/users/${userId}`, data);
};
