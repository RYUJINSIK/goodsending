import React, { useState } from "react";
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
import ImageUpload from "./ImageUpload";
import { productUpload } from "@/api/productApi";

const ProductUploadForm = () => {
  // 상태 관리를 위한 useState 훅
  const [images, setImages] = useState(Array(5).fill(null));
  const [name, setName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [auctionTime, setAuctionTime] = useState("BREAKFAST");

  // 이미지 변경 핸들러
  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = file; // URL이 아닌 파일 객체를 받아야겠지?
      setImages(newImages);
    }
  };

  // 가격 입력 핸들러 (숫자만 입력 가능)
  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPrice(value);
  };

  // 가격 포맷팅
  const formatPrice = (value) => {
    const numberValue = parseInt(value, 10);
    return isNaN(numberValue)
      ? ""
      : new Intl.NumberFormat("ko-KR").format(numberValue);
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log({ images, title, description, price, startDate, auctionTime });

    const formData = new FormData();
    images.forEach((image, index) => {
      if (image) {
        fetch(image);
        // .then((res) => res.blob())
        // .then((blob) => {
        formData.append(`image${index}`, image);
      }
    });
    formData.append("name", name); // 제품 제목 추가
    formData.append("introduction", introduction); // 제품 설명 추가
    formData.append("price", price); // 제품 가격 추가
    formData.append("startDate", startDate); // 경매 시작 날짜 추가
    formData.append("auctionTime", auctionTime); // 경매 시간 추가

    try {
      const response = await productUpload();
      console.log("Upload successful:", response.data); // 성공 시 응답 데이터 로그 출력
      // 성공 처리 로직 추가 (예: 성공 메시지 표시 또는 페이지 리다이렉트)
    } catch (error) {
      console.error("Upload failed:", error); // 실패 시 에러 로그 출력
      // 오류 처리 로직 추가 (예: 오류 메시지 표시)
    }
  };

  return (
    <Card className="p-6">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 이미지 업로드 섹션 */}
          <div className="mb-4">
            <Label className="block text-xl font-medium mb-1 text-left">
              사진 업로드 (최대 5개)
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-2">
              {images.map((image, index) => (
                <ImageUpload
                  key={index}
                  index={index}
                  image={image}
                  onChange={handleImageChange}
                />
              ))}
            </div>
          </div>

          {/* 제품명 입력 */}
          <div className="mb-4">
            <Label className="block text-xl font-medium text-left mb-1">
              제품명
            </Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="제품명을 입력하세요"
              required
            />
          </div>

          {/* 제품 설명 입력 */}
          <div className="mb-4">
            <Label className="block text-xl font-medium text-left mb-1">
              제품 설명
            </Label>
            <textarea
              className="w-full mt-1 p-2 border rounded-md"
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              placeholder="제품에 대한 설명을 입력하세요"
              required
            />
          </div>

          {/* 입찰 시작 금액 입력 */}
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

          {/* 경매 시작 날짜 선택 */}
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

          {/* 경매 시간 설정 */}
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
                <SelectItem value="BREAKFAST">오전</SelectItem>
                <SelectItem value="AFTERNOON">오후</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 제출 버튼 */}
          <Button type="submit" className="mt-4 z-0">
            등록하기
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductUploadForm;
