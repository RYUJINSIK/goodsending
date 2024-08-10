import axios from "./axios";

export const productUpload = async (token, requestBody) => {
  console.log("token ? : ", token);
  try {
    const response = await axios.post(`/api/products`, requestBody, {
      headers: {
        Access_Token: `Bearer ${token}`,
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

export const productDetails = async (token, productId) => {
  try {
    const response = await axios.get(`/api/products/${productId}`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postBids = async (token, requestBody) => {
  try {
    const response = await axios.post(`/api/bids`, requestBody, {
      headers: {
        Authorization: token,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
