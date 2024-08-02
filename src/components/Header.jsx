import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";

const Header = () => {
  const [isLogIn, setIsLogIn] = useState(false);
  const [Cash, setCash] = useState(10000);
  const navigate = useNavigate();
  const userName = "사용자 이름";

  const handleUploadClick = () => {
    navigate("/product-upload");
  };

  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 bg-white z-50">
      <div className="flex items-center">
        <img src="../public/icon/LogoBlack.png" alt="logo" className="h-8" />
      </div>

      <nav className="flex items-center space-x-4">
        {isLogIn ? (
          <>
            <Badge className="bg-green-200 text-green-800 px-2 py-1 rounded-full">
              잔여 캐시: {Cash}원
            </Badge>
            <button onClick={handleUploadClick}>판매/등록</button>

            <DropdownMenu>
              <DropdownMenuTrigger>마이페이지</DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuItem>회원 정보 수정</DropdownMenuItem>
                <DropdownMenuItem>쿠폰함</DropdownMenuItem>
                <DropdownMenuItem>찜한 상품</DropdownMenuItem>
                <DropdownMenuItem>캐시 충전</DropdownMenuItem>
                <DropdownMenuItem>경매신청 내역</DropdownMenuItem>
                <DropdownMenuItem>경매판매 내역</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <span>고객센터</span>
            <span>{userName}</span>
          </>
        ) : (
          <>
            <span>고객센터</span>

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setIsLogIn(true)}
            >
              로그인
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
