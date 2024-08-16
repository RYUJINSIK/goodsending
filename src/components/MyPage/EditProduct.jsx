import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { productDetails, editProduct } from "@/api/productApi";

const EditProduct = ({ productId, isOpen, onClose }) => {
  const token = useSelector((state) => state.auth.access_token);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    introduction: "",
    startDate: "",
    auctionTime: "",
    productImages: [],
  });
  const [error, setError] = useState("");
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    if (productId !== undefined && isOpen) fetchProductDetails();
  }, [isOpen, productId]);

  const fetchProductDetails = async () => {
    try {
      const product = await productDetails(productId);
      console.log("상품정보 : ", product);
      if (product) {
        const [date, time] = product.startDateTime.split("T");
        const auctionTime = time.startsWith("12:") ? "AFTERNOON" : "EVENING";
        setEditedProduct({
          name: product.name,
          introduction: product.introduction || "",
          startDate: date,
          auctionTime: auctionTime,
          productImages: product.productImages || [],
        });
        setNewImages([]);
        setError("");
      } else {
        setError("해당 상품 정보를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("Failed to fetch product details:", error);
      setError("상품 정보를 불러오는데 실패했습니다.");
    }
  };

  const handleInputChange = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages([...newImages, ...files]);
  };

  const removeImage = (index, isNew = false) => {
    if (isNew) {
      setNewImages(newImages.filter((_, i) => i !== index));
    } else {
      setEditedProduct((prev) => ({
        ...prev,
        productImages: prev.productImages.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      editedProduct.introduction.length < 1 ||
      editedProduct.introduction.length > 255
    ) {
      setError("상품 소개는 1글자 이상 255자 이하로 입력할 수 있습니다.");
      return;
    }

    try {
      const formData = new FormData();

      const requestDto = JSON.stringify({
        name: editedProduct.name,
        introduction: editedProduct.introduction,
        startDate: editedProduct.startDate,
        auctionTime: editedProduct.auctionTime,
      });

      formData.append(
        "requestDto",
        new Blob([requestDto], { type: "application/json" })
      );

      // 기존 이미지 URL 추가
      editedProduct.productImages.forEach((url) => {
        formData.append("productImages", url);
      });

      newImages.forEach((file) => {
        formData.append("productImages", file);
      });

      await editProduct(token, productId, formData);
      onClose(); // 성공적으로 수정되면 다이얼로그를 닫습니다.
    } catch (error) {
      console.error("Failed to edit product:", error);
      setError("상품 수정에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  // 날짜 범위 계산
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const maxDate = new Date(tomorrow);
  maxDate.setDate(maxDate.getDate() + 6);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>상품 수정</DialogTitle>
          <DialogDescription>상품 정보를 수정합니다.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              name="name"
              value={editedProduct.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="introduction">설명</Label>
            <Input
              id="introduction"
              name="introduction"
              value={editedProduct.introduction}
              onChange={handleInputChange}
              maxLength={255}
            />
          </div>
          <div>
            <Label htmlFor="startDate">시작 날짜</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={editedProduct.startDate}
              onChange={handleInputChange}
              min={minDate}
              max={maxDateStr}
            />
          </div>
          <div>
            <Label htmlFor="auctionTime">경매 시간</Label>
            <Select
              onValueChange={(value) =>
                handleSelectChange("auctionTime", value)
              }
              value={editedProduct.auctionTime}
            >
              <SelectTrigger>
                <SelectValue placeholder="경매 시간 선택" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="AFTERNOON" className="bg-white">
                  12:00 - 15:00
                </SelectItem>
                <SelectItem value="EVENING" className="bg-white">
                  18:00 - 21:00
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="images">새 이미지</Label>
            <Input
              id="images"
              name="images"
              type="file"
              onChange={handleImageUpload}
              multiple
            />
          </div>
          <div>
            <Label>현재 이미지</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {editedProduct.productImages.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url.url}
                    alt={`Product ${index}`}
                    className="w-20 h-20 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Label>새 이미지 미리보기</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {newImages.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`New ${index}`}
                    className="w-20 h-20 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index, true)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit">수정 완료</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProduct;
