import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Clock, CheckCircle } from "lucide-react";
import { getOrderList, updateDelivery } from "@/api/productApi";

const AuctionSaleItem = ({ sale, onShipment }) => {
  const hasShippingInfo =
    sale.orderResponse.receiverAddress &&
    sale.orderResponse.receiverCellNumber &&
    sale.orderResponse.receiverName;

  return (
    <Card className="mb-4 overflow-hidden bg-white shadow-lg rounded-lg">
      <div className="flex items-center p-4">
        <img
          src={sale.productSummaryDto.thumbnailUrl}
          alt={sale.productSummaryDto.name}
          className="w-20 h-20 object-cover rounded-md mr-4"
        />
        <div className="flex-grow">
          <h3 className="text-lg font-semibold mb-1">
            {sale.productSummaryDto.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            경매 시작가:{" "}
            <span className="font-bold">
              {sale.productSummaryDto.price.toLocaleString()}원
            </span>
          </p>
          <p className="text-red-500 font-bold">
            최종 낙찰가:{" "}
            <span className="font-bold">
              {sale.productSummaryDto.finalPrice.toLocaleString()}원
            </span>
          </p>
        </div>
        <div className="flex flex-col items-end">
          {hasShippingInfo ? (
            sale.orderResponse.status === "PENDING" ? (
              <Button
                onClick={() => onShipment(sale.orderResponse.orderId)}
                className="bg-green-500 text-white hover:bg-green-600 transition duration-300"
              >
                <Truck size={16} className="mr-2" />
                배송 시작
              </Button>
            ) : (
              <div className="flex items-center text-blue-500">
                <CheckCircle size={16} className="mr-2" />
                <span className="font-semibold">배송 완료</span>
              </div>
            )
          ) : (
            <div className="flex items-center text-yellow-500">
              <Clock size={16} className="mr-2" />
              <span className="font-semibold">배송지 입력 대기중</span>
            </div>
          )}
        </div>
      </div>
      {hasShippingInfo && (
        <div className="bg-gray-50 p-4 mt-2 rounded-b-lg border-t border-gray-200">
          <h4 className="font-semibold mb-3 text-gray-700">배송 정보</h4>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="text-sm text-gray-500 w-1/5">수령인</td>
                <td className="text-sm font-medium w-4/5">
                  {sale.orderResponse.receiverName}
                </td>
              </tr>
              <tr>
                <td className="text-sm text-gray-500 w-1/5">연락처</td>
                <td className="text-sm font-medium w-4/5">
                  {sale.orderResponse.receiverCellNumber}
                </td>
              </tr>
              <tr>
                <td className="text-sm text-gray-500 w-1/5">주소</td>
                <td className="text-sm font-medium w-4/5">
                  {sale.orderResponse.receiverAddress}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

const AuctionSale = () => {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.access_token);
  const memberId = useSelector((state) => state.auth.userData.memberId);

  useEffect(() => {
    const fetchSales = async () => {
      setIsLoading(true);
      try {
        const response = await getOrderList(token, memberId);
        console.log(response.content);
        setSales(response.content);
        setError(null);
      } catch (error) {
        console.error("판매 내역 조회 중 오류 발생:", error);
        setError("판매 내역을 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSales();
  }, [token, memberId]);

  const handleShipment = async (orderId) => {
    try {
      await updateDelivery(token, orderId);
      setSales(
        sales.map((sale) =>
          sale.orderResponse.orderId === orderId
            ? {
                ...sale,
                orderResponse: { ...sale.orderResponse, status: "SHIPPING" },
              }
            : sale
        )
      );
    } catch (error) {
      console.error("배송 출발 처리 중 오류 발생:", error);
    }
  };

  if (isLoading) return <div className="text-center p-4">로딩 중...</div>;
  if (error)
    return <div className="text-center p-4 text-red-500">에러: {error}</div>;

  return (
    <Card className="w-[750px] h-full min-h-[600px] max-h-[80vh] overflow-hidden bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">경매 판매 내역</h2>
      <div className="overflow-y-auto h-[calc(80vh-150px)]">
        {sales.length > 0 ? (
          sales.map((sale) => (
            <AuctionSaleItem
              key={sale.orderResponse.orderId}
              sale={sale}
              onShipment={handleShipment}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">판매 내역이 없습니다.</p>
        )}
      </div>
    </Card>
  );
};

export default AuctionSale;
