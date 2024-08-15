import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useSelector } from "react-redux";

const ProductUploadForm = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.access_token);
  // 상태 관리를 위한 useState 훅
  const [images, setImages] = useState(Array(5).fill(null));
  const [totalFileSize, setTotalFileSize] = useState(0);
  const [name, setName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
  const [auctionTime, setAuctionTime] = useState("AFTERNOON");

  // 이미지 변경 핸들러
  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      // 파일 크기 제한
      const maxSize = 10 * 1024 * 1024;
      const maxTotalSize = 50 * 1024 * 1024;

      if (file.size > maxSize) {
        alert("파일 크기는 10MB를 초과할 수 없습니다.");
        return;
      }
      const newTotalSize =
        totalFileSize - (images[index]?.size || 0) + file.size;
      if (newTotalSize > maxTotalSize) {
        alert("전체 파일 크기가 50MB를 초과할 수 없습니다.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = {
          file: file,
          preview: reader.result,
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
        };
        setImages(newImages);
        setTotalFileSize(newTotalSize);
      };
      reader.readAsDataURL(file);
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

    const formData = new FormData();

    // JSON 데이터 추가
    const requestDto = {
      name,
      price,
      introduction,
      startDate: startDate.toISOString().split("T")[0],
      auctionTime,
    };
    formData.append(
      "requestDto",
      new Blob([JSON.stringify(requestDto)], { type: "application/json" })
    );

    // 이미지 파일 추가
    images.forEach((image) => {
      if (image && image.file) {
        formData.append(`productImages`, image.file);
      }
    });

    try {
      const response = await productUpload(token, formData);
      console.log("Upload successful:", response.data);
      // if (onUploadSuccess) {
      //   onUploadSuccess();
      // }
      navigate("/");
    } catch (error) {
      console.error("Upload failed:", error);
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
              minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
              maxDate={new Date(new Date().setDate(new Date().getDate() + 7))}
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
                <SelectItem value="AFTERNOON">12:00 - 15:00</SelectItem>
                <SelectItem value="EVENING">18:00 - 21:00</SelectItem>
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
