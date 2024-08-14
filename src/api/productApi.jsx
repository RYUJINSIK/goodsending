import axios from "./axios";

export const productUpload = async (token, requestBody) => {
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

export const productDetails = async (productId) => {
  try {
    const response = await axios.get(`/api/products/${productId}`);
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
        Access_Token: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const toggleLikes = async (token, requestBody) => {
  try {
    const response = await axios.post(`/api/likes/redis`, requestBody, {
      headers: {
        Access_Token: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getLiveChat = async (productId, size, cursorId) => {
  try {
    const url = `/api/product-message-histories?productId=${productId}&size=${size}${
      cursorId ? `&cursorId=${cursorId}` : ""
    }`;

    const response = await axios.get(url);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getProducts = async (
  cursor,
  searchTerm,
  openProduct,
  closedProduct
) => {
  try {
    const url = `/api/products?size=20${
      cursor.id
        ? `&cursorId=${cursor.id}&cursorStatus=${cursor.status}&cursorStartDateTime=${cursor.startDateTime}`
        : ""
    }${
      searchTerm !== "" ? `&keyword=${searchTerm}` : ""
    }&openProduct=${openProduct}&closedProduct=${closedProduct}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTOPLikeProducts = async () => {
  try {
    const response = await axios.get("/api/likes/redis");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTOPBidProducts = async () => {
  try {
    const response = await axios.get("/api/products/top5/bidderCount");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
