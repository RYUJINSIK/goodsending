import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearToken } from "@/redux/modules/auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";

const Header = ({ openLogin, onTabChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(clearToken());
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleUploadClick = () => {
    navigate("/product-upload");
  };

  const handleMypageClick = () => {
    navigate("/mypage");
  };
  const handleDropdownSelect = (tabValue) => {
    if (onTabChange) {
      onTabChange(tabValue);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 bg-white z-50">
      <div className="flex items-center">
        <img
          src="../icon/LogoBlack.png"
          alt="logo"
          className="h-8 cursor-pointer"
          onClick={handleLogoClick}
        />
      </div>

      <nav className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <Badge className="bg-green-200 text-green-800 px-2 py-1 rounded-full">
              잔여 캐시: {user.cash === null ? 0 : user.cash}원
            </Badge>
            <button onClick={handleUploadClick}>판매/등록</button>

            <DropdownMenu>
              <DropdownMenuTrigger onClick={handleMypageClick}>
                마이페이지
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-white">
                <DropdownMenuItem
                  onClick={() => handleDropdownSelect("회원 정보 수정")}
                >
                  회원 정보 수정
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDropdownSelect("찜한 상품")}
                >
                  찜한 상품
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDropdownSelect("캐시충전")}
                >
                  캐시 충전
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDropdownSelect("경매신청 내역")}
                >
                  경매신청 내역
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDropdownSelect("경매판매 내역")}
                >
                  경매판매 내역
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={handleLogout}>로그아웃</Button>
            <span>고객센터</span>
            <span>{user.email}</span>
          </>
        ) : (
          <>
            <span>고객센터</span>

            <Button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              // onClick={() => setIsLogIn(true)}
              onClick={openLogin}
            >
              로그인
            </Button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
