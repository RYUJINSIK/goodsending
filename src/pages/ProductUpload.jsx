import React from "react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProductUpload = () => {
  const [images, setImages] = useState(Array(5).fill(null));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [auctionTime, setAuctionTime] = useState("오전");

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남기기
    setPrice(value);
  };

  const formatPrice = (value) => {
    const numberValue = parseInt(value, 10);

    return isNaN(numberValue)
      ? ""
      : new Intl.NumberFormat("ko-KR").format(numberValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      images,
      title,
      description,
      price,
      startDate,
      session,
      duration,
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-screen-md">
      <h2 className="text-2xl font-bold mt-8 mb-8">판매 등록</h2>

      <Card className="p-6">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <Label className="block text-xl font-medium mb-1 text-left">
                사진 업로드 (최대 5개)
              </Label>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-2">
                {images.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <Card className="w-full h-full flex items-center border-2 border-gray-400 justify-center overflow-hidden cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(index, e)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />

                      {image ? (
                        <img
                          src={image}
                          alt={`업로드된 이미지 ${index + 1}`}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-400">이미지 업로드</span>
                      )}
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <Label className="block text-xl font-medium text-left mb-1">
                제품명
              </Label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제품명을 입력하세요"
                required
              />
            </div>

            <div className="mb-4">
              <Label className="block text-xl font-medium text-left mb-1">
                제품 설명
              </Label>

              <textarea
                className="w-full mt-1 p-2 border rounded-md"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="제품에 대한 설명을 입력하세요"
                required
              />
            </div>

            <div className="mb-4 flex items-center">
              <Label className="block text-xl font-medium text-left mb-1 mr-2 w-1/2">
                입찰 시작 금액
              </Label>

              <div className="flex items-center w-1/2">
                <Input
                  type="text"
                  value={formatPrice(price)}
                  onChange={handlePriceChange}
                  placeholder="가격을 입력해주세요"
                  className="text-right p-2"
                  required
                />
                <span className="ml-2">원</span>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <Label className="block text-xl font-medium text-left mb-1 w-1/2">
                경매 시작 날짜
              </Label>

              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                minDate={new Date()}
                maxDate={new Date(new Date().setDate(new Date().getDate() + 6))}
                dateFormat="yyyy/MM/dd"
                className="w-full mt-1 border rounded rounded-m p-2 block text-center"
              />
            </div>

            <div className="mb-4 flex items-center justify-between">
              <Label className="block text-xl font-medium text-left mb-1 w-1/2">
                경매 시간 설정
              </Label>
              <Select
                value={auctionTime}
                onValueChange={setAuctionTime}
                className="w-1/2"
              >
                <SelectTrigger className="w-1/2 mt-1">
                  <SelectValue placeholder="Select auction time" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="오전">오전</SelectItem>
                  <SelectItem value="오후">오후</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="mt-4 z-0">
              등록하기
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductUpload;
