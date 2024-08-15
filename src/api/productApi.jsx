import axios from "./axios";

// 상품 등록
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

// 상품 조회
export const getMyProducts = async (token, params) => {
  try {
    console.log("Sending request with token:", token);
    const response = await axios.get(`api/products`, {
      headers: {
        Access_Token: `Bearer ${token}`,
      },
      params: { ...params },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching my prroducts:", error);
    throw error;
  }
};

// 경매 상품 상세 조회
export const productDetails = async (productId) => {
  try {
    const response = await axios.get(`/api/products/${productId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 상품 수정
export const editProduct = async (token, productId, requestBody) => {
  try {
    const response = await axios.put(
      `/api/products/${productId}`,
      requestBody,
      {
        headers: {
          Access_Token: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error editing product:", error);
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

// 상품 삭제
export const deleteProduct = async (token, productId) => {
  try {
    const response = await axios.delete(`/api/products/${productId}`, {
      headers: { Access_Token: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// 비밀번호 변경
export const updatePassword = async (token, memberId, passwordData) => {
  try {
    const response = await axios.put(
      `/api/members/${memberId}/password`,
      passwordData,
      {
        headers: {
          Access_Token: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Password update response:", response);
    return response.data;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

// 주문 수신자 정보

export const updateReceiverInfo = async (token, orderId, receiverInfo) => {
  try {
    const response = await axios.put(
      `/api/orders/${orderId}/receiver-info`,
      receiverInfo,
      {
        headers: {
          Access_Token: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("수신자 정보 업데이트 중 오류 발생:", error);
    throw error;
  }
};

// 캐시 충전

export const chargeCash = async (token, memberId, cash) => {
  console.log(memberId);
  try {
    const response = await axios.put(
      `/api/members/${memberId}/cash`,
      { cash: cash },
      {
        headers: {
          Access_Token: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error cahrging cash", error);
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

// 주문 배송 정보
export const updateDelivery = async (token, orderId) => {
  try {
    const response = await axios.put(
      `/api/orders/${orderId}/delivery`,
      {},
      {
        headers: {
          Access_Token: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("배송 정보 업데이트 중 오류 발생:", error);
    throw error;
  }
};

// 주문 확인
export const confirmOrder = async (token, orderId) => {
  try {
    const response = await axios.put(
      `/api/orders/${orderId}/confirm`,
      {},
      {
        headers: {
          Access_Token: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("주문 확인 중 오류 발생:", error);
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

// 입찰 내역 확인
export const getAuctionBid = async (token, memberId, page = 0, size = 15) => {
  try {
    const response = await axios.get(`/api/bids`, {
      headers: {
        Access_Token: `Bearer ${token}`,
      },
      params: {
        memberId,
        page,
        size,
      },
    });
    return response.data;
  } catch (error) {
    console.error("경매 신청 내역 조회 중 오류 발생:", error);
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
    // const response = await axios.get("/api/likes/redis");
    const response = await axios.get("/api/likes/top5 ");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 찜한 상품 조회
export const getLikedProducts = async (token, page, size, sortBy, isAsc) => {
  try {
    const response = await axios.get(`/api/likes`, {
      headers: {
        Access_Token: `Bearer ${token}`,
      },
      params: {
        page,
        size,
        sortBy,
        isAsc,
      },
    });
    return response.data;
  } catch (error) {
    console.error("찜한 상품 목록 조회 중 오류 발생:", error);
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
