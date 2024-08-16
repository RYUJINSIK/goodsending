import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearToken } from "@/redux/modules/auth";
import { logout } from "@/api/userApi";
import { persistor } from "@/redux/config/configStore";
import { CircleDollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";

const Header = ({ openLogin }) => {
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

      // 서버 로그아웃이 성공하면 로컬 상태를 정리합니다.
      dispatch(clearToken());

      // Redux 상태와 localStorage를 초기화합니다.
      persistor.purge().then(() => {
        console.log("Purge completed");
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

  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 bg-white z-50 h-24 border-b border-gray-100">
      <div className="flex items-center">
        <img
          src="../icon/LogoBlack.png"
          alt="logo"
          className="h-12 cursor-pointer"
          onClick={handleLogoClick}
        />
      </div>

      <nav className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <Badge className="bg-primary text-white px-2 py-1 rounded-xl">
              CASH :
              {user.cash === null ? 0 : parseInt(user.cash).toLocaleString()}{" "}
              <CircleDollarSign size={22} className="ml-1" />{" "}
            </Badge>

            <Button
              onClick={handleUploadClick}
              className="bg-white text-black hover:bg-slate-50 rounded-xl"
            >
              판매/등록
            </Button>
            <Button
              onClick={handleMypageClick}
              className="bg-white text-black hover:bg-slate-100 rounded-xl"
            >
              마이페이지
            </Button>
            <Button
              onClick={handleLogout}
              className="bg-slate-200 text-black hover:bg-slate-800 hover:text-white rounded-xl"
            >
              로그아웃
            </Button>
          </>
        ) : (
          <Button
            className="bg-blue-400 hover:bg-[#3B7DEC] text-white px-4 py-2 rounded-xl"
            onClick={openLogin}
          >
            로그인
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
