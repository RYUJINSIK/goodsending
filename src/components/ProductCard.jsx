import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function formatAuctionTime(startDateTime) {
  const startDate = new Date(startDateTime);
  const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000); // 3시간 추가

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  }

  function formatTime(date) {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // 0시는 12시로 표시
    return `${String(hours).padStart(2, "0")}:${minutes}${ampm}`;
  }

  const formattedStart = `${formatDate(startDate)} ${formatTime(startDate)}`;
  const formattedEnd = formatTime(endDate);

  return `${formattedStart} ~ ${formattedEnd}`;
}
function ProductCard({ product }) {
  const [status, setStatus] = useState("");
  const [statusColor, setStatusColor] = useState("");

  useEffect(() => {
    switch (product.status) {
      case "UPCOMING":
        setStatus("경매예정");
        setStatusColor("bg-blue-100 text-blue-800");
        break;
      case "ONGOING":
        setStatus("경매중");
        setStatusColor("bg-green-100 text-green-800");
        break;
      case "ENDED":
        setStatus("경매종료");
        setStatusColor("bg-red-100 text-red-800");
        break;
      default:
        setStatus("");
        setStatusColor("bg-gray-100 text-gray-800");
    }
  }, [product.status]);

  return (
    <Card className="overflow-hidden relative transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
      <div className="h-48 overflow-hidden">
        <img
          src={product.thumbnailUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-2 right-2">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}
        >
          {status}
        </span>
      </div>
      <CardContent className="p-4">
        <p className="font-bold text-md mb-2">{product.name}</p>
        <p className="text-gray-500 text-xs">경매 시작가</p>
        <p className="font-bold text-sm">{product.price}원</p>
        <p className="text-gray-500 mt-1 text-xs">
          {formatAuctionTime(product.startDateTime)}
        </p>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
