import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateReceiverInfo } from "@/api/productApi";

const AuctionBid = () => {
  const [successfulAuctions, setSuccessfulAuctions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const token = useSelector((state) => state.auth.access_token);

  useEffect(() => {
    const fetchSuccessfulAuctions = async () => {
      try {
        const response = await axios.get("/api/successful-auctions", {
          headers: { Access_Token: `Bearer ${token}` },
        });
        setSuccessfulAuctions(response.data);
      } catch (error) {
        console.error("낙찰된 상품 목록 조회 실패:", error);
      }
    };

    fetchSuccessfulAuctions();
  }, [token]);

  const SuccessfulAuctionItem = ({ auction, onUpdateShipping }) => (
    <Card className="p-4 mb-4">
      <h4 className="font-semibold">{auction.productName}</h4>
      <p>최종 낙찰가: {auction.finalBid.toLocaleString()}원</p>
      <p>상태: {auction.status}</p>
      <p>배송 상태: {auction.deliveryStatus}</p>
      <div className="mt-2">
        {auction.deliveryStatus === "배송 준비 중" && (
          <Button onClick={() => onUpdateShipping(auction.orderId)}>
            배송 정보 입력
          </Button>
        )}
      </div>
    </Card>
  );

  const ReceiverInfoForm = ({ orderId }) => {
    const [receiverInfo, setReceiverInfo] = useState({
      receiverName: "",
      receiverCellNumber: "",
      receiverAddress: "",
    });
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (name === "receiverCellNumber") {
        const numericValue = value.replace(/[^0-9]/g, "");
        const formattedValue = formatPhoneNumber(numericValue);
        setReceiverInfo((prev) => ({ ...prev, [name]: formattedValue }));
      } else {
        setReceiverInfo((prev) => ({ ...prev, [name]: value }));
      }
    };

    const formatPhoneNumber = (value) => {
      if (value.length <= 3) return value;
      if (value.length <= 7) return `${value.slice(0, 3)}-${value.slice(3)}`;
      return `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await updateReceiverInfo(token, orderId, receiverInfo);
        setMessage("배송지 정보가 성공적으로 업데이트되었습니다.");
        // 성공 후 상품 목록 갱신
        const response = await axios.get("/api/successful-auctions", {
          headers: { Access_Token: `Bearer ${token}` },
        });
        setSuccessfulAuctions(response.data);
        setIsDialogOpen(false);
      } catch (error) {
        setMessage("배송지 정보 업데이트에 실패했습니다. 다시 시도해주세요.");
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">수신자 이름</label>
          <Input
            type="text"
            name="receiverName"
            value={receiverInfo.receiverName}
            onChange={handleInputChange}
            placeholder="이름을 입력하세요"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">수신자 휴대번호</label>
          <Input
            type="tel"
            name="receiverCellNumber"
            value={receiverInfo.receiverCellNumber}
            onChange={handleInputChange}
            placeholder="하이픈을 제외한 숫자만 입력하세요"
            maxLength={13}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">수신자 주소</label>
          <Input
            type="text"
            name="receiverAddress"
            value={receiverInfo.receiverAddress}
            onChange={handleInputChange}
            placeholder="주소를 입력하세요"
            required
          />
        </div>
        <div className="flex justify-center mt-6">
          <Button type="submit">수신자 정보 저장</Button>
        </div>
        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    );
  };

  return (
    <Card className="w-[750px] h-full min-h-[600px] max-h-[80vh] overflow-hidden bg-white p-6">
      <h2 className="text-2xl font-bold mb-6">경매 신청 내역</h2>
      <div className="overflow-y-auto h-[calc(80vh-150px)]">
        {successfulAuctions.map((auction) => (
          <SuccessfulAuctionItem
            key={auction.orderId}
            auction={auction}
            onUpdateShipping={(orderId) => {
              setSelectedOrderId(orderId);
              setIsDialogOpen(true);
            }}
          />
        ))}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>배송 정보 입력</DialogTitle>
          </DialogHeader>
          <ReceiverInfoForm orderId={selectedOrderId} />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AuctionBid;
