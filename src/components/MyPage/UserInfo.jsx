import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { chargeCash } from "@/api/productApi";
import { useDispatch } from "react-redux";
import { getUserInfo } from "@/api/userApi";
import { setUserData } from "@/redux/modules/auth";
import { Wallet, CreditCard } from "lucide-react";

const UserInfo = ({ user, token }) => {
  const [cash, setCash] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const formatNumber = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleCashChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, "");

    const formattedValue = formatNumber(value);
    setCash(formattedValue);
  };

  const handleChargeCash = async () => {
    const cashAmount = parseInt(cash.replace(/,/g, ""), 10);
    try {
      const response = await chargeCash(token, user.memberId, cashAmount);
      console.log("cash charged successfully:", response);
      updateUserInfo();
      setCash("");
      setIsDialogOpen(false); // Dialog 닫기
    } catch (error) {
      console.error("Cash charge failed:", error);
      // 에러 처리 로직 추가
    }
  };

  const updateUserInfo = async () => {
    try {
      const userData = await getUserInfo(token);
      console.log("User Data : ", userData);
      dispatch(setUserData(userData.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="p-6 mb-5 bg-white shadow-lg rounded-lg">
      <h3 className="text-xl font-bold mb-6 text-gray-800">
        {user.email} 회원님
      </h3>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Wallet className="text-blue-500 mr-2" size={24} />
          <div>
            <p className="text-sm text-gray-500">포인트</p>
            <p className="font-bold text-lg">
              {parseInt(user.point).toLocaleString() || 0} 원
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <CreditCard className="text-green-500 mr-2" size={24} />
          <div>
            <p className="text-sm text-gray-500">캐시</p>
            <p className="font-bold text-lg">
              {parseInt(user.cash).toLocaleString() || 0} 원
            </p>
          </div>
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            캐시 충전
          </Button>
        </DialogTrigger>
        <DialogContent className="w-80 p-6 bg-white rounded-lg shadow-xl">
          <DialogTitle className="text-xl font-bold mb-4">
            캐시 충전하기
          </DialogTitle>
          <DialogDescription className="mb-4">
            충전할 금액을 입력하세요.
          </DialogDescription>
          <input
            type="text"
            placeholder="충전할 금액 입력"
            value={cash}
            onChange={handleCashChange}
            className="w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button className="mr-2 bg-gray-200 text-gray-800 hover:bg-gray-300">
                취소
              </Button>
            </DialogClose>
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600"
              onClick={handleChargeCash}
            >
              캐시 충전
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default UserInfo;
