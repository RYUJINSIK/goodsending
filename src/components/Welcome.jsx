import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Welcome({ isOpen, onClose }) {
  const navigate = useNavigate();

  const submitLogin = () => {
    localStorage.setItem("showLoginModal", "true");
    navigate("/");
    onClose();
  };

  const handleOpenChange = (isOpen) => {
    if (!isOpen) {
      navigate("/");
      onClose();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogOverlay className="bg-white">
        <DialogTitle />
        <DialogContent
          className="bg-white w-2/4 flex flex-col items-center"
          hideCloseIcon={true}
        >
          <img src="../icon/welcome.svg" alt="logo" className="h-full" />
          <div className="-mt-12 flex flex-col items-center">
            <p className="text-2xl font-bold underline decoration-primary decoration-wavy decoration-2 underline-offset-4 ">
              🎉 환영합니다 ! 🎉{" "}
            </p>
            <p className="text-lg pt-3 ">회원가입이 완료되었습니다.</p>
          </div>
          <Button className="bg-primary w-full" onClick={submitLogin}>
            <LogIn className="mr-2 h-4 w-4" />
            로그인하기
          </Button>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}

export default Welcome;
