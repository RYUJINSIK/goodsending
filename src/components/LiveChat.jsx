import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircleMore } from "lucide-react";

function LiveChat({ messages, currentUserEmail }) {
  return (
    <div className="fixed bottom-10 right-10 z-50">
      <Popover>
        <PopoverTrigger>
          <Button className="bg-primary w-12 h-12 rounded-full p-3">
            <MessageCircleMore className="w-10 h-10" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="right-10 mr-4 mb-3 w-full bg-white">
          <div className="w-96 flex flex-col justify-center items-center">
            <p className="text-lg font-bold mb-3">
              [제품명] 구매자들 실시간 채팅방
            </p>
            {messages.map((message, index) => (
              <Badge
                key={index}
                variant={message.type === "announcement" ? "outline" : "solid"}
                className={`px-2 py-1 rounded-full mt-1 mb-1 ${
                  message.type === "announcement"
                    ? "text-black"
                    : message.sender === currentUserEmail
                    ? "text-white self-end"
                    : "text-white self-start"
                }`}
              >
                {message.content}
              </Badge>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default LiveChat;
