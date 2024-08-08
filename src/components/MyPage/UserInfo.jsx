import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";

const UserInfo = ({ user }) => {
  const [cash, setCash] = useState("");

  const formatNumber = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleCashChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, "");

    const formattedValue = formatNumber(value);
    setCash(formattedValue);
  };

  return (
    <Card className="p-5 mb-5 min-w-[320px] bg-white">
      <h3 className="text-lg font-bold mb-4">{user.email} 회원님</h3>
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500 text-center">포인트</p>
          <div className="flex justify-between">
            <p className="font-bold">0</p>
            <p className="font-bold">원</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500">캐시</p>
          <div className="flex justify-between">
            <p className="font-bold">{user.cash || 0}</p>
            <p className="font-bold">원</p>
          </div>
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full mt-4">캐시 충전</Button>
        </DialogTrigger>
        <DialogContent className="w-72 p-4 z-50 bg-[#fff]">
          <h4 className="text-lg font-bold mb-2">캐시 충전하기</h4>
          <input
            type="text"
            placeholder="충전할 금액 입력"
            value={cash}
            onChange={handleCashChange}
            className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
          />
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button className="mr-2 h-10">취소</Button>
            </DialogClose>
            <Button className="w-full h-10">캐시 충전</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default UserInfo;
