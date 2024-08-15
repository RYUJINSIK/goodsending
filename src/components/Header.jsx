import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearToken } from "@/redux/modules/auth";
import { logout, refreshAccessToken } from "@/api/userApi";
import { persistor } from "@/redux/config/configStore";

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
  const token = useSelector((state) => state.auth.access_token);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = async () => {
    const logoutToken = token;
    try {
      // 먼저 서버에 로그아웃 요청을 보냅니다.
      const response = await logout(logoutToken);
      console.log(response);

      // 서버 로그아웃이 성공하면 로컬 상태를 정리합니다.
      dispatch(clearToken());

      // Redux 상태와 localStorage를 초기화합니다.
      persistor.purge().then(() => {
        console.log("Purge completed");
        // 필요한 경우 여기서 페이지를 새로고침하거나 로그인 페이지로 리다이렉트할 수 있습니다.
        // window.location.reload();
        // 또는
        // navigate('/login');
      });
    } catch (error) {
      console.error("Logout failed:", error);
      // 에러 처리 (예: 사용자에게 알림)
    }
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
