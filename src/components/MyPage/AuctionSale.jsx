import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { updateDelivery, confirmOrder } from "@/api/productApi";

const AuctionSale = () => {
  const [sales, setSales] = useState([]);
  const token = useSelector((state) => state.auth.access_token);

  // 배송 출발 처리 함수
  const handleShipment = async (id) => {
    try {
      const orderData = await updateDelivery(token, id);
      setSales(
        sales.map((sale) =>
          sale.id === id ? { ...sale, deliveryStatus: "배송 준비" } : sale
        )
      );
    } catch (error) {
      console.error("배송 출발 처리 중 오류 발생:", error);
    }
  };

  // 주문 확인 처리
  const handleConfirmOrder = async (id) => {
    try {
      const orderData = await confirmOrder(token, id); // 주문 확인 API 호출
      setSales(
        sales.map((sale) =>
          sale.id === id ? { ...sale, status: "거래 완료", ...orderData } : sale
        )
      );
    } catch (error) {
      console.error("주문 확인 중 오류 발생:", error);
    }
  };

  return (
    <Card className="w-[750px] h-full min-h-[600px] max-h-[80vh] overflow-hidden bg-white p-6">
      <h2 className="text-2xl font-bold mb-6">경매 판매 내역</h2>
      <div className="overflow-y-auto h-[calc(80vh-150px)]">
        {sales.length > 0 ? (
          sales.map((sale) => (
            <Card key={sale.id} className="p-4 mb-4">
              <h3 className="font-semibold">{sale.productName}</h3>
              <p>최종 낙찰가: {sale.finalBid.toLocaleString()}원</p>
              <p>상태: {sale.status}</p>
              <p>배송 상태: {sale.deliveryStatus}</p>
              <div className="mt-2">
                {sale.deliveryStatus === "배송중" && (
                  <Button onClick={() => handleConfirmOrder(sale.id)}>
                    배송 완료
                  </Button>
                )}
              </div>
            </Card>
          ))
        ) : (
          <p>판매 내역이 없습니다.</p>
        )}
      </div>
    </Card>
  );
};

export default AuctionSale;
