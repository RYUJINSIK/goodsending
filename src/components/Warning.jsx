import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Undo2, OctagonX } from "lucide-react";

function Warning({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white w-1/4 flex flex-col items-center">
        <p className="text-lg font-semibold underline decoration-primary decoration-wavy decoration-2 underline-offset-4">
          회원 전용 페이지입니다 !
        </p>
        <p className="text-sm">로그인 후 다시 시도해주세요.</p>
        <Button className="bg-primary w-full" onClick={onClose}>
          <Undo2 className="mr-2 h-4 w-4" />
          돌아가기
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default Warning;
