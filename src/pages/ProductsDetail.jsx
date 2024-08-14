import { useState, useEffect, useCallback } from "react";
import { productDetails, postBids, toggleLikes } from "@/api/productApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Bidding from "@/components/Bidding";
import ProductsImageView from "@/components/ProductsImageView";
import { Button } from "@/components/ui/button";
import LiveChat from "@/components/LiveChat";
import { ShoppingBasket, Users, HandCoins } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import Login from "@/components/Login";
import { Client } from "@stomp/stompjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductsDetail() {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.access_token);

  // const token = useSelector((state) => state.auth.token);
  const userEmail = useSelector((state) => state.auth.userData.email);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("DISCONNECTED");
  const [productInfo, setProductInfo] = useState(null);
  const [images, setImages] = useState([]);
  const [active, setActive] = useState(false);
  const [price, setPrice] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [bidInfo, setBidInfo] = useState({
    bidder: 0,
    bid: 0,
  });
  const [auctionStatus, setAuctionStatus] = useState("ONGOING");
  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  useEffect(() => {
    const newClient = new Client({
      brokerURL: import.meta.env.VITE_SOCKET_URL,
      connectHeaders: {
        Access_Token: `Bearer ${token}`,
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

      newClient.subscribe(`/topic/products/${id}`, function (message) {
        setBidInfo((prevBidInfo) => ({
          ...prevBidInfo,
          bidder: JSON.parse(message.body).bidderCount,
          bid: JSON.parse(message.body).biddingCount,
        }));
        if (JSON.parse(message.body).type === "BID") {
          setActive(!active);
          setPrice(JSON.parse(message.body).price);
        }
        if (JSON.parse(message.body).type === "AUCTION_WINNER")
          setAuctionStatus("ENDED");

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

  const getProductDetails = async () => {
    try {
      const response = await productDetails(id);
      console.log(response);
      setBidInfo((prevBidInfo) => ({
        ...prevBidInfo,
        bidder: response.bidderCount,
        bid: response.biddingCount,
      }));
      if (response.bidMaxPrice !== null) {
        setPrice(response.bidMaxPrice);
      } else {
        setPrice(response.price);
      }
      setAuctionStatus(response.status);
      setImages(response.productImages || []);
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
      } catch (error) {
        alert(error.response.data.message); // 현재 최고 입찰 금액이 입력한 금액보다 큽니다.
        console.error("Bidding failed:", error);
      }
    },
    [token, id]
  );

  const handleSendMessage = (chatMessage) => {
    if (
      client &&
      connectionStatus === "CONNECTED" &&
      chatMessage.trim() !== ""
    ) {
      client.publish({
        destination: `/app/message`, // 서버의 목적지에 맞게 설정
        body: JSON.stringify({
          productId: productInfo.productId,
          message: chatMessage,
          type: "GENERAL_CHAT",
        }),
        headers: {
          Access_Token: `Bearer ${token}`, // 예: 인증 토큰 추가
        },
      });
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [id, token]);

  useEffect(() => {
    let timer;
    if (auctionStatus === "UPCOMING" && productInfo) {
      const startTime = new Date(productInfo.startDateTime).getTime();
      const checkTime = () => {
        const now = new Date().getTime();
        if (now >= startTime) {
          setAuctionStatus("ONGOING");
          clearInterval(timer);
        }
      };
      timer = setInterval(checkTime, 1000); // 1초마다 체크
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [auctionStatus, productInfo]);

  const renderCountdown = () => {
    if (!auctionStatus) return null;
    switch (auctionStatus) {
      case "UPCOMING":
        return (
          <div className="bg-blue-100 text-blue-800 p-2 rounded-lg text-center">
            <p className="font-semibold">경매 시작 시간</p>
            <p>{new Date(productInfo.startDateTime).toLocaleString()}</p>
          </div>
        );
      case "ONGOING":
        return (
          <div className="bg-white text-black p-2 rounded-lg text-center border border-primary">
            <p className="font-semibold">경매 종료까지 남은 시간</p>
            <CountdownTimer
              remainingExpiration={productInfo.remainingExpiration}
              isActive={true}
              callerComponent="ProductsDetail"
              endDateTime={productInfo.maxEndDateTime}
              triggerReset={active}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderPriceLabel = () => {
    if (!productInfo) return null;

    switch (auctionStatus) {
      case "UPCOMING":
        return "시작 가격";
      case "ONGOING":
        return "현재 가격";
      case "ENDED":
        return "최종 가격";
      default:
        return "";
    }
  };

  const handleLikeButton = async () => {
    if (!isAuthenticated) {
      openLogin();
      return;
    }
    const requestBody = {
      productId: productInfo.productId,
      press: true,
    };
    try {
      const Like = await toggleLikes(token, requestBody);
      if (Like.data.message === "ALREADY_LIKE") showToast("ALREADY");
      if (Like.data.message === "CREATE_SUCCESS") showToast("SUCCESS");
    } catch (error) {
      console.log(error);
    }
  };

  const showToast = (type) => {
    switch (type) {
      case "ALREADY":
        toast.info("이미 찜한 상품입니다!");
        break;
      case "SUCCESS":
        toast.success("찜목록에 추가되었습니다.");
        break;
      default:
        toast.error("오류가 발생했습니다.");
    }
  };

  function formatAuctionTime(startDateTime, dynamicEndDateTime) {
    const startDate = new Date(startDateTime);
    let endDate;
    let dynamicEndDate;

    function formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}.${month}.${day}`;
    }

    function formatTime(date) {
      let hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // 0시는 12시로 표시
      return `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
    }

    const formattedStart = `${formatDate(startDate)} ${formatTime(startDate)}`;

    if (dynamicEndDateTime) {
      endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000); // 3시간 추가
      dynamicEndDate = new Date(dynamicEndDateTime);
      return `${formattedStart} ~ ${formatTime(
        endDate
      )} (실제 마감시간 ${formatTime(dynamicEndDate)})`;
    } else {
      endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000); // 3시간 추가
      return `${formattedStart} ~ ${formatTime(endDate)}`;
    }
  }

  return (
    <div className="flex flex-col w-screen h-100vh justify-center mt-20 pt-5">
      <div className="flex w-3/4 mx-auto">
        {productInfo && (
          <>
            <div className="flex flex-col w-1/2 justify-start items-end">
              <ProductsImageView
                images={images}
                productName={productInfo.name}
                startingPrice={productInfo.price}
              />
              <div className="w-full max-w-[470px] justify-center items-center h-max mt-3">
                <div className="p-3 text-lg whitespace-pre-wrap break-words text-left border shadow-sm rounded-lg">
                  {productInfo.introduction}
                </div>
              </div>
            </div>

            <div className="ml-5 flex flex-col w-1/2 justify-start items-start">
              <LiveChat
                title={productInfo.name}
                messages={messages}
                setMessages={setMessages}
                currentUserEmail={userEmail}
                isLoggedIn={isAuthenticated}
                handleSendMessage={handleSendMessage}
                productId={productInfo.productId}
              />
              <div className="flex flex-row justify-between w-[450px] gap-3 mt-3">
                <Button
                  variant="outline"
                  className="text-xl w-1/2 h-14 bg-white"
                  onClick={handleLikeButton}
                >
                  <ShoppingBasket className="mr-2" />
                  찜하기
                </Button>

                <Bidding callPostBids={callPostBids} currentHighPrice={price} />
              </div>
              {productInfo && (
                <>
                  <div className="flex flex-col items-center w-[450px] mt-3">
                    <p className="text-xl font-semibold text-center w-full bg-white p-3 rounded-lg border border-primary">
                      {renderPriceLabel()}:{" "}
                      <span className="underline decoration-primary decoration-wavy decoration-2 underline-offset-4 ">
                        {auctionStatus === "ENDED"
                          ? productInfo.finalPrice
                          : price}{" "}
                        원
                      </span>
                    </p>
                    <div className="w-full mt-3">{renderCountdown()}</div>
                    <p className="w-full mt-1 text-sm">
                      경매 시간 :{" "}
                      {formatAuctionTime(
                        productInfo.startDateTime,
                        productInfo.dynamicEndDateTime
                      )}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between w-[450px] gap-3 mt-3 mb-7">
                    <div className="flex items-center w-1/2 justify-end">
                      <Users className="w-6 h-6 mr-2" />
                      <span>입찰자수 : {bidInfo.bidder}명</span>
                    </div>
                    <div className="flex items-center w-1/2 justify-start">
                      <HandCoins className="w-6 h-6 mr-2 text-green-700" />
                      <span>입찰건수 : {bidInfo.bid}건</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {/* <Button onClick={() => setActive(!active)} className="mt-5">
          TEST
        </Button> */}
      </div>
      <Login isOpen={isLoginOpen} onClose={closeLogin} />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default ProductsDetail;
