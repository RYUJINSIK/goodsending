import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BellRing, Send } from "lucide-react";

function LiveChat({ messages, currentUserEmail, onSendMessage, isLoggedIn }) {
  const [inputValue, setInputValue] = useState("");
  const cardContentRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.altKey) {
      e.preventDefault();
      if (inputValue.trim()) {
        onSendMessage(inputValue);
        setInputValue("");
      }
    }
  };

  const handleSendClick = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  // Scroll to the bottom of the chat area whenever messages change
  useEffect(() => {
    if (cardContentRef.current) {
      cardContentRef.current.scrollTop = cardContentRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Card className="bg-white h-[535px] w-[450px] p-2">
      <CardHeader>
        <CardDescription>[제품명] 구매자들 실시간 채팅방</CardDescription>
      </CardHeader>
      <CardContent
        ref={cardContentRef}
        className="w-full h-[400px] bg-white overflow-y-auto"
      >
        <div className="flex flex-col space-y-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "announcement"
                  ? "justify-center "
                  : message.sender === currentUserEmail
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <Badge
                variant={
                  message.type === "announcement" ? "outline" : "default"
                }
                className={`px-2 py-1 rounded-full ${
                  message.type === "announcement" ? "text-black" : "text-white"
                }`}
              >
                {message.type === "announcement" ? (
                  <>
                    <BellRing className="h-3 w-3 mr-2 text-primary" />
                    {message.content}
                  </>
                ) : (
                  message.content
                )}
              </Badge>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-1 mb-1">
          <Badge
            variant="outline"
            className="px-2 py-1 rounded-full text-black"
          >
            <BellRing className="h-3 w-3 mr-2 text-primary" /> 공지 영역
            TEST입니다.
          </Badge>
        </div>

        <div className="flex justify-start mt-1">
          <Badge
            variant="default"
            className="px-2 py-1 rounded-full text-white"
          >
            상대방 채팅 예시입니다.
          </Badge>
        </div>

        <div className="flex justify-start mt-1">
          <Badge
            variant="default"
            className="px-2 py-1 rounded-full text-white"
          >
            한마디
          </Badge>
        </div>

        <div className="flex justify-start mt-1">
          <Badge
            variant="default"
            className="px-2 py-1 rounded-full text-white"
          >
            두마디
          </Badge>
        </div>

        <div className="flex justify-end mt-1">
          <Badge
            variant="secondary"
            className="px-2 py-1 rounded-full text-white"
          >
            내가 입력한 채팅 예시입니다.
          </Badge>
        </div>
        <div className="flex justify-end mt-1">
          <Badge
            variant="secondary"
            className="px-2 py-1 rounded-full text-white"
          >
            내가 입력한 채팅 예시입니다.
          </Badge>
        </div>
        <div className="flex justify-end mt-1">
          <Badge
            variant="secondary"
            className="px-2 py-1 rounded-full text-white"
          >
            내가 입력한 채팅 예시입니다.
          </Badge>
        </div>
        <div className="flex justify-end mt-1">
          <Badge
            variant="secondary"
            className="px-2 py-1 rounded-full text-white"
          >
            내가 입력한 채팅 예시입니다.
          </Badge>
        </div>
        <div className="flex justify-end mt-1">
          <Badge
            variant="secondary"
            className="px-2 py-1 rounded-full text-white"
          >
            내가 입력한 채팅 예시입니다.
          </Badge>
        </div>
        <div className="flex justify-end mt-1">
          <Badge
            variant="secondary"
            className="px-2 py-1 rounded-full text-white"
          >
            내가 입력한 채팅 예시입니다.
          </Badge>
        </div>
        <div className="flex justify-end mt-1">
          <Badge
            variant="secondary"
            className="px-2 py-1 rounded-full text-white"
          >
            내가 입력한 채팅 예시입니다.
          </Badge>
        </div>
        <div className="flex justify-end mt-1">
          <Badge
            variant="secondary"
            className="px-2 py-1 rounded-full text-white"
          >
            내가 입력한 채팅 예시입니다.
          </Badge>
        </div>
        <div className="flex justify-end mt-1">
          <Badge
            variant="secondary"
            className="px-2 py-1 rounded-full text-white"
          >
            내가 입력한 채팅 예시입니다.
          </Badge>
        </div>
        <div className="flex justify-end mt-1">
          <Badge
            variant="secondary"
            className="px-2 py-1 rounded-full text-white"
          >
            내가 입력한 채팅 예시입니다.
          </Badge>
        </div>
        <div className="flex justify-end mt-1">
          <Badge
            variant="secondary"
            className="px-2 py-1 rounded-full text-white"
          >
            내가 입력한 채팅 예시입니다.
          </Badge>
        </div>
        <div className="flex justify-end mt-1">
          <Badge
            variant="secondary"
            className="px-2 py-1 rounded-full text-white"
          >
            내가 입력한 채팅 예시입니다.
          </Badge>
        </div>
        <div className="flex justify-end mt-1">
          <Badge
            variant="secondary"
            className="px-2 py-1 rounded-full text-white"
          >
            내가 입력한 채팅 예시입니다.
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="bg-white flex items-center p-2 mt-3">
        <Input
          className="flex-grow p-2 border rounded-md resize-none"
          rows="1"
          placeholder={
            isLoggedIn ? "채팅을 입력하세요..." : "회원만 채팅이 가능합니다."
          }
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={!isLoggedIn}
        />
        <Button
          className="ml-2"
          onClick={handleSendClick}
          disabled={!isLoggedIn}
        >
          <Send className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default LiveChat;
