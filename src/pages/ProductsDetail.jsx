import { useState, useEffect, useCallback } from "react";
import { productDetails, postBids } from "@/api/productApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Bidding from "@/components/Bidding";
import { Client } from "@stomp/stompjs";

function ProductsDetail() {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);

  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("DISCONNECTED");
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    const newClient = new Client({
      brokerURL: `wss://${import.meta.env.VITE_SOCKET_URL}`,
      connectHeaders: {
        Authorization: token,
      },
      debug: function (str) {
        console.log("STOMP: " + str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    newClient.onConnect = function (frame) {
      setConnectionStatus("CONNECTED");
      console.log("Connected: " + frame);

      newClient.subscribe(`/topic/bidder-count/${id}`, function (message) {
        console.log("Received: " + message.body);
        setMessages((prevMessages) => [
          ...prevMessages,
          JSON.parse(message.body),
        ]);
      });
    };

    newClient.onStompError = function (frame) {
      setConnectionStatus("ERROR");
      console.log("Broker reported error: " + frame.headers["message"]);
      console.log("Additional details: " + frame.body);
    };

    newClient.onWebSocketClose = function () {
      setConnectionStatus("CLOSED");
      console.log("WebSocket Connection Closed");
    };

    newClient.onDisconnect = function () {
      setConnectionStatus("DISCONNECTED");
      console.log("Stomp Disconnected");
    };

    console.log("Attempting to connect to WebSocket...");
    newClient.activate();
    setClient(newClient);

    return () => {
      console.log("Deactivating WebSocket connection...");
      if (newClient) {
        newClient.deactivate();
      }
    };
  }, [id, token]);

  useEffect(() => {
    console.log("WebSocket Connection Status:", connectionStatus);
  }, [connectionStatus]);

  const getProductDetails = async () => {
    try {
      const response = await productDetails(token, id);
      setProductInfo(response);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  };

  const callPostBids = useCallback(
    async (bidPrice, usePoint) => {
      const requestBody = {
        bidPrice,
        usePoint,
        productId: id,
      };
      try {
        const response = await postBids(token, requestBody);
        console.log("Bid placed successfully:", response);
        // 여기에 성공 처리 로직을 추가하세요 (예: 알림 표시, 상태 업데이트 등)
      } catch (error) {
        console.error("Bidding failed:", error);
        // 여기에 에러 처리 로직을 추가하세요 (예: 에러 메시지 표시)
      }
    },
    [token, id]
  );

  useEffect(() => {
    getProductDetails();
  }, [id, token]);

  return (
    <div>
      <h1>소켓 테스트</h1>
      <p>Connection Status: {connectionStatus}</p>
      {productInfo && (
        <div>
          <h2>{productInfo.name}</h2>
          <p>{productInfo.introduction}</p>
        </div>
      )}
      <Bidding callPostBids={callPostBids} />
      <div>
        <h3>Bidder Count Messages:</h3>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductsDetail;
