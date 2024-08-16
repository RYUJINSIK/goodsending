import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getAuctionBid, updateReceiverInfo } from "@/api/productApi";
import {
  MapPinned,
  CheckCircle,
  XCircle,
  User,
  Phone,
  MapPin,
} from "lucide-react";

const AuctionBid = () => {
  const [successfulAuctions, setSuccessfulAuctions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const token = useSelector((state) => state.auth.access_token);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    fetchAuctionBids();
  }, [token, page, size]);

  const fetchAuctionBids = async () => {
    try {
      const data = await getAuctionBid(token, userData.memberId, page, size);
      setSuccessfulAuctions(data.content);
    } catch (error) {
      console.error("경매 신청 내역 조회 실패:", error);
    }
  };

  const handleUpdateShipping = (orderId) => {
    setSelectedOrderId(orderId);
    setIsDialogOpen(true);
  };

  const ReceiverInfoForm = () => {
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
        await updateReceiverInfo(token, selectedOrderId, receiverInfo);
        setMessage("배송지 정보가 성공적으로 업데이트되었습니다.");
        // 성공 후 경매 신청 내역 갱신
        fetchAuctionBids();
        setIsDialogOpen(false);
      } catch (error) {
        setMessage("배송지 정보 업데이트에 실패했습니다. 다시 시도해주세요.");
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="receiverName"
            className="text-sm font-medium text-gray-700"
          >
            수신자 이름
          </Label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              id="receiverName"
              type="text"
              name="receiverName"
              value={receiverInfo.receiverName}
              onChange={handleInputChange}
              placeholder="이름을 입력하세요"
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="receiverCellNumber"
            className="text-sm font-medium text-gray-700"
          >
            수신자 휴대번호
          </Label>
          <div className="relative">
            <Phone
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              id="receiverCellNumber"
              type="tel"
              name="receiverCellNumber"
              value={receiverInfo.receiverCellNumber}
              onChange={handleInputChange}
              placeholder="010-0000-0000"
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              maxLength={13}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="receiverAddress"
            className="text-sm font-medium text-gray-700"
          >
            수신자 주소
          </Label>
          <div className="relative">
            <MapPin
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              id="receiverAddress"
              type="text"
              name="receiverAddress"
              value={receiverInfo.receiverAddress}
              onChange={handleInputChange}
              placeholder="주소를 입력하세요"
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          수신자 정보 저장
        </Button>

        {message && (
          <p className="mt-4 text-center text-sm font-medium text-green-600">
            {message}
          </p>
        )}
      </form>
    );
  };

  return (
    <Card className="h-full min-h-[600px] max-h-[80vh] overflow-hidden bg-white">
      <div className="sticky top-0 bg-white z-10 pt-6 px-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold mb-4">경매 신청 내역</h2>
          <p className="font-bold mb-4">전체 {successfulAuctions.length}개</p>
        </div>
        <hr className="border-gray-300 mb-2" />
      </div>
      <div className="pl-5 pr-5 overflow-y-auto h-[calc(80vh-70px)]">
        {successfulAuctions.length > 0 ? (
          successfulAuctions.map((bid) => (
            <div key={bid.bidId} className="flex items-center border-b py-4">
              <img
                src={bid.productSummaryDto.thumbnailUrl}
                alt={bid.productSummaryDto.name}
                className="w-20 h-20 object-cover mr-4"
              />
              <div className="flex-grow">
                <h3 className="font-semibold">{bid.productSummaryDto.name}</h3>
                <p className="text-gray-700 text-sm">
                  경매시작가 : {bid.productSummaryDto.price.toLocaleString()}원
                </p>
                <p className="text-red-500 font-bold">
                  입찰 금액 : {bid.bidPrice.toLocaleString()}원
                </p>
              </div>
              <div className="flex flex-col items-end">
                {bid.bidStatus !== "FAILED" ? (
                  <div className="flex flex-row items-center">
                    <Button
                      variant="outline"
                      className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 mr-3"
                      onClick={() => handleUpdateShipping(bid.bidId)}
                    >
                      <MapPinned size={16} className="mr-2" />
                      배송지 입력
                    </Button>
                    <div className="flex items-center text-green-500">
                      <CheckCircle size={20} className="mr-1" />
                      <span className="font-semibold">입찰 성공</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center text-red-500">
                    <XCircle size={20} className="mr-1" />
                    <span className="font-semibold">입찰 실패</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-full">
            <p>경매 신청 내역이 없습니다.</p>
          </div>
        )}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>배송 정보 입력</DialogTitle>
          </DialogHeader>
          <ReceiverInfoForm />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AuctionBid;
