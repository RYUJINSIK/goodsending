import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

function Top5ProductCard({ product }) {
  return (
    <div className="relative mx-auto overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 via-gray-200 to-primary p-[3px] transition-all duration-300 ease-in-out transform hover:scale-105">
      <div className="animate-spin-slow absolute -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white/90 to-transparent"></div>
      <Card className="relative overflow-hidden bg-white">
        <div className="h-48 overflow-hidden">
          <img
            src={product.thumbnailUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-2 right-2">
          <span
          // className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}
          >
            {status}
          </span>
        </div>
        <CardContent className="p-4">
          <p className="font-bold text-md mb-2">{product.name}</p>
          <p className="text-gray-500 text-xs">경매 시작가 </p>
          <p className="font-bold text-sm">{product.price}원</p>

          <p className="text-gray-500 mt-1 text-xs">
            {/* {formatAuctionTime(product.startDateTime)} */}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Top5ProductCard;
