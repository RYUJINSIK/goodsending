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
import {
  BellRing,
  Send,
  Trophy,
  PartyPopper,
  MessagesSquare,
} from "lucide-react";
import { getLiveChat } from "@/api/productApi";
import { useSelector } from "react-redux";
import Loading from "./Loading";

function LiveChat({
  title,
  messages,
  setMessages,
  isLoggedIn,
  handleSendMessage,
  productId,
  productStatus,
}) {
  const [inputValue, setInputValue] = useState("");
  const cardContentRef = useRef(null);
  const [cursorId, setCursorId] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [chatStatus, setChatStatus] = useState(true);
  const user = useSelector((state) => state.auth.userData);
  const prevLastMessageId = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.altKey && e.nativeEvent.isComposing === false) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSendClick = () => {
    sendMessage();
  };

  const sendMessage = () => {
    if (inputValue.trim()) {
      handleSendMessage(inputValue);
      setInputValue("");
      scrollToBottom(true); // 새 메시지 전송 시 스크롤 하단으로 이동
    }
  };

  const handleScroll = async () => {
    if (cardContentRef.current.scrollTop === 0 && !loading) {
      setLoading(true);
      await getChatMessage(true); // 이전 메시지 로드 시 isLoadingPrevious를 true로 설정
      setLoading(false);
    }
  };

  const scrollToBottom = (force = false) => {
    if (cardContentRef.current) {
      const { scrollHeight, clientHeight, scrollTop } = cardContentRef.current;
      const maxScrollTop = scrollHeight - clientHeight;

      if (force || scrollTop >= maxScrollTop - 100) {
        setTimeout(() => {
          if (cardContentRef.current) {
            cardContentRef.current.scrollTop =
              cardContentRef.current.scrollHeight;
          }
        }, 100);
      }
    }
  };

  useEffect(() => {
    const loadMessages = async () => {
      await getChatMessage(false); // 초기 로딩 시에는 isLoadingPrevious를 false로 설정
      if (initialLoading) {
        scrollToBottom(true);
        setInitialLoading(false);
      }
    };
    if (productStatus === "ENDED") setChatStatus(false);
    setTimeout(loadMessages, 1000);
  }, []);

  const getChatMessage = async (isLoadingPrevious = false) => {
    try {
      const response = await getLiveChat(productId, 15, cursorId);
      const sortedMessages = response.content.sort((a, b) => a.id - b.id);
      if (sortedMessages.length > 0) {
        const oldestNewMessageId = sortedMessages[0].id;
        setCursorId(oldestNewMessageId);

        setMessages((prevMessages) => {
          const uniqueNewMessages = sortedMessages.filter(
            (newMsg) =>
              !prevMessages.some((prevMsg) => prevMsg.id === newMsg.id)
          );
          const newMessages = [...uniqueNewMessages, ...prevMessages];

          if (isLoadingPrevious) {
            // 이전 메시지를 불러올 때는 스크롤 위치 유지
            return newMessages;
          } else {
            // 새 메시지를 받았을 때는 스크롤을 아래로 이동
            scrollToBottom(true);
            return newMessages;
          }
        });
      }
    } catch (error) {
      console.error("Failed to fetch chat messages:", error);
    }
  };

  const formatTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];

      const isCurrentUser = lastMessage.memberId === user.memberId;
      const isSystemMessage =
        lastMessage.type === "BID" || lastMessage.type === "AUCTION_WINNER";

      if (!isCurrentUser || isSystemMessage) {
        scrollToBottom(true);
      }

      prevLastMessageId.current = lastMessage.id;
    }

    const hasAuctionWinner = messages.some(
      (message) => message.type === "AUCTION_WINNER"
    );
    if (hasAuctionWinner) {
      scrollToBottom(true);
      setChatStatus(false);
    }
  }, [messages, user.memberId]);

  // useEffect(() => {
  //   const hasAuctionWinner = messages.some(
  //     (message) => message.type === "AUCTION_WINNER"
  //   );
  //   if (hasAuctionWinner) {
  //     scrollToBottom(true);
  //     setChatStatus(false);
  //   }
  // }, [messages]);

  return (
    <Card className="bg-white h-[535px] w-[450px] p-2 ">
      <CardHeader>
        <CardDescription className="text-sm">
          {title} 실시간 채팅방
        </CardDescription>
      </CardHeader>
      <CardContent
        ref={cardContentRef}
        className={`w-full h-[400px] ${
          !chatStatus || !isLoggedIn
            ? "bg-gray-white scrollbar-hide overflow-y-hidden	opacity-50"
            : "bg-white overflow-y-auto "
        }`}
        onScroll={handleScroll}
      >
        {initialLoading || loading ? (
          <Loading />
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <MessagesSquare className="h-12 w-12 text-primary mb-4" />
            <p className="text-lg font-semibold text-gray-700 mb-2">
              채팅방에 오신 것을 환영합니다!
            </p>
            <p className="text-sm text-gray-500 text-center">
              첫 메시지를 보내 경매에 대해 이야기를 나눠보세요.
            </p>
          </div>
        ) : (
          <div className="flex flex-col space-y-2">
            {messages.map((message, index) => {
              const isCurrentUser = message.memberId === user.memberId;

              if (message.type === "AUCTION_WINNER") {
                return (
                  <div key={index}>
                    <div className="flex justify-center">
                      <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-3 max-w-[100%] w-[95%]">
                        <div className="flex items-center justify-center mb-2">
                          <PartyPopper className="h-5 w-5 text-yellow-500 mr-2" />
                          <span className="font-bold text-yellow-700">
                            축하합니다 !
                          </span>
                        </div>
                        <p className="text-center text-yellow-800 text-sm font-bold">
                          {message.message}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center w-full">
                      <div className="flex-grow border-t border-gray-400"></div>
                      <span className="flex-shrink mx-4 text-black text-sm">
                        경매가 종료되었습니다.
                      </span>
                      <div className="flex-grow border-t border-gray-400"></div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  className={`flex ${
                    message.type === "BID"
                      ? "justify-center"
                      : message.type === "GENERAL_CHAT" && isCurrentUser
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {message.type !== "BID" && isCurrentUser && (
                    <span className="text-xs text-gray-500 mr-2 mt-3">
                      {formatTime(message.createdDateTime)}
                    </span>
                  )}
                  <Badge
                    variant={message.type === "BID" ? "outline" : "default"}
                    className={`px-2 py-1 rounded-full ${
                      message.type === "BID"
                        ? "text-black"
                        : isCurrentUser
                        ? "bg-blue-200 text-blue-600"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {message.type === "BID" ? (
                      <>
                        <BellRing className="h-3 w-3 mr-2 text-primary" />
                        {message.message}
                      </>
                    ) : (
                      <>{message.message}</>
                    )}
                  </Badge>
                  {message.type !== "BID" && !isCurrentUser && (
                    <span className="text-xs text-gray-500 ml-2 mt-3">
                      {formatTime(message.createdDateTime)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-white flex items-center p-2 mt-3">
        <Input
          className="flex-grow p-2 border rounded-md resize-none"
          rows="1"
          placeholder={
            !chatStatus
              ? "종료된 경매는 채팅이 불가능합니다."
              : !isLoggedIn
              ? "비회원은 채팅이 불가능합니다."
              : ""
          }
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={!isLoggedIn || !chatStatus}
        />
        <Button
          className="ml-2"
          onClick={handleSendClick}
          disabled={!isLoggedIn || !chatStatus}
        >
          <Send className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default LiveChat;
