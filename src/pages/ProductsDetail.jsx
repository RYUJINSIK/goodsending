import { useState, useEffect, useCallback } from "react";
import { productDetails, postBids } from "@/api/productApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Bidding from "@/components/Bidding";
import ProductsImageView from "@/components/ProductsImageView";
import { Button } from "@/components/ui/button";
import LiveChat from "@/components/LiveChat";
import { Client } from "@stomp/stompjs";
import { ShoppingBasket } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer"; // Import the CountdownTimer

function ProductsDetail() {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  const userEmail = useSelector((state) => state.auth.userData.email);

  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("DISCONNECTED");
  const [productInfo, setProductInfo] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    console.log("WebSocket Connection Status:", connectionStatus);
  }, [connectionStatus]);

  const getProductDetails = async () => {
    try {
      const response = await productDetails(token, id);
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
        console.error("Bidding failed:", error);
      }
    },
    [token, id]
  );

  useEffect(() => {
    getProductDetails();
  }, [id, token]);

  return (
    <div className="flex w-screen h-screen justify-center mt-20 bg-white pt-5 ">
      <div className="flex w-3/4">
        <div className="flex w-1/2 justify-end ">
          <ProductsImageView images={images} />
        </div>
        <div className="ml-5 flex flex-col w-1/2 justify-start items-start ">
          {/* <hr className="h-1 bg-blue-200 w-full mb-3" />
          {productInfo && (
            <div className="items-start justify-start flex flex-col">
              <p className="text-4xl font-bold">{productInfo.name}</p>
              <p className="mt-3 text-2xl whitespace-pre text-left">
                {productInfo.introduction}
              </p>
              <span className="mt-3 text-xl font-semibold text-left">
                경매 시작 가격 <br />
                <p className="text-2xl">{productInfo.price} 원</p>
              </span>
              <CountdownTimer
                startDateTime={productInfo.startDateTime}
                endDateTime={productInfo.endDateTime}
              />
            </div>
          )}
          <hr className="h-1 bg-blue-200 w-full mb-3 mt-3" />
          <div className="flex flex-row justify-between w-full gap-3">
            <Button variant="outline" className="text-xl w-1/2 h-14">
              <ShoppingBasket className="mr-2" />
              찜하기
            </Button>
            <Bidding callPostBids={callPostBids} />
          </div> */}
        </div>
      </div>
      <LiveChat messages={messages} currentUserEmail={userEmail} />
    </div>
  );
}

export default ProductsDetail;
