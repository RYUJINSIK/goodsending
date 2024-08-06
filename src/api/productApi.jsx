import axios from "./axios";

export const productUpload = async (token, requestBody) => {
  try {
    const response = await axios.post(`/api/products`, requestBody, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
