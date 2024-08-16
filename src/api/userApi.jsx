import axios from "./axios";

export const getLoginToken = async (requestBody) => {
  try {
    const response = await axios.post(`/api/members/login`, requestBody);
    return response.headers.access_token;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getUserInfo = (token) => {
  try {
    const response = axios.get(`/api/members/info`, {
      headers: {
        Access_Token: `Bearer ${token}`,
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

export const logout = async (token) => {
  try {
    const response = await axios.delete(`/api/members/logout`, {
      headers: {
        Access_Token: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 액세스 토큰 갱신 함수
export const refreshAccessToken = async () => {
  try {
    const response = await axios.post("/api/members/tokenReissue", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    throw error;
  }
};

// 엑세스 토큰 유효성 체크
export const accessTokenCheck = async (token) => {
  try {
    const response = await axios.get("/api/members/validateAccessToken", {
      headers: {
        Access_Token: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to access token verification:", error);
    throw error;
  }
};
