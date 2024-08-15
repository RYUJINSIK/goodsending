import axios from "axios";
import { store } from "../redux/config/configStore";
import { setToken } from "@/redux/modules/auth";
import { refreshAccessToken } from "@/api/userApi";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // API 통신할 URL 환경변수로 관리
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 요청 인터셉터 설정
instance.interceptors.request.use(
  (config) => {
    // const token = store.getState().auth.token;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);
// 응답 인터셉터 설정
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "만료된 JWT token 입니다." &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        store.dispatch(setToken(newAccessToken.headers.access_token)); // Redux 스토어에 저장
        originalRequest.headers.Access_Token = `Bearer ${newAccessToken.headers.access_token}`;
        return instance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
