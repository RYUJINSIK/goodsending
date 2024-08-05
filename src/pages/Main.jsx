import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card, CardContent } from "@/components/ui/card";
import Login from "@/components/Login";

const Main = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);
  useEffect(() => {
    const shouldLoginModal = localStorage.getItem("showLoginModal");
    if (shouldLoginModal === "true") {
      openLogin();
      localStorage.removeItem("showLoginModal"); // 모달을 한 번만 표시하기 위해 삭제
    }
  }, []);
  const images = [
    "https://media.istockphoto.com/id/175194979/ko/사진/커요-늘이다.jpg?s=1024x1024&w=is&k=20&c=ytEWnY4uZNI7BXRdwSJiWAVD0hGz9u6CNB0zg0PsYPQ=",
    "https://media.istockphoto.com/id/108198324/ko/사진/고양이-새끼-공격하십시오.jpg?s=612x612&w=0&k=20&c=EnYiY2NrBVzwYnJX6DUTz9HwYMr1u3muKUsvI7vHO7I=",
    "https://media.istockphoto.com/id/638051946/ko/사진/분홍색-베개가-있는-고양이-발-유리-아래에서-촬영.jpg?s=612x612&w=0&k=20&c=7QINmPYds1yRVXq75b00V13lhlHcA3BmYXG-rfcNGmE=",
  ];
  const ProductCard = ({ title, startingPrice, imageUrl }) => (
    <Card className="overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-600">
          경매 시작 가격: {startingPrice}원
        </p>
      </CardContent>
    </Card>
  );
  return (
    <div className="container mx-auto p-4">
      <Carousel>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <img
                src={image}
                alt={`슬라이드 이미지 ${index + 1}`}
                className="w-full h-64 object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex items-center justify-between mt-8 mb-4">
        <h2 className="text-2xl font-bold">🔥 TOP5 인기 매물</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
        {[...Array(5)].map((_, index) => (
          <ProductCard
            key={index}
            title={`매물 이름 ${index + 1}`}
            startingPrice={1000 + index * 500}
            imageUrl={images[index % images.length]}
          />
        ))}
      </div>
      <div className="flex items-center justify-stretch mt-8 mb-4">
        <h2 className="text-2xl font-bold mx-4">전체 상품 보기</h2>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="검색"
            className="border rounded-full p-2 mt-2 mb-4 w-full pl-10 pr-4 py-2"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[...Array(20)].map((_, index) => (
          <ProductCard
            key={index + 5}
            title={`매물 이름 ${index + 6}`}
            startingPrice={1200 + index * 300}
            imageUrl={images[index % images.length]}
          />
        ))}
      </div>
      <Login isOpen={isLoginOpen} onClose={closeLogin} />
    </div>
  );
};

export default Main;
