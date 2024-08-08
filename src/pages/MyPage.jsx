import React from "react";
import { useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const UserInfo = ({ user }) => (
  <Card className="p-5 mb-5 min-w-[320px] bg-white">
    <h3 className="text-lg font-bold mb-4">{user.email} 회원님</h3>
    <div className="flex justify-between">
      <div>
        <p className="text-sm text-gray-500 text-center">포인트</p>
        <div className="flex justify-between">
          <p className="font-bold">0</p>
          <p className="font-bold">원</p>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500">캐시</p>
        <div className="flex justify-between">
          <p className="font-bold">{user.cash || 0}</p>
          <p className="font-bold">원</p>
        </div>
      </div>
    </div>
    <Button className="w-full mt-4">캐시 충전</Button>
  </Card>
);

const WishlistItem = ({ item }) => (
  <div className="flex items-center border-b py-4">
    <img
      src={item.image}
      alt={item.name}
      className="w-20 h-20 object-cover mr-4"
    />
    <div className="flex-grow">
      <h3 className="font-semibold">{item.name}</h3>
      <p className="text-red-500 font-bold">
        {item.discountRate}% {item.price.toLocaleString()}원
      </p>
      <p className="text-gray-500 line-through">
        {item.originalPrice.toLocaleString()}원
      </p>
    </div>
    <div className="flex flex-col items-center">
      <button className="bg-[#FF2A00] text-white px-4 py-2 rounded mb-2">
        삭제
      </button>
    </div>
  </div>
);

const ContentArea = ({ tabValue, wishlistItems }) => (
  <Card className="min-w-[650px] p-5 h-full min-h-[600px] bg-white">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold mb-4">{tabValue}</h2>
      <p className="text-sm text-gray-500 mb-4">
        찜한 상품은 최대 200개까지 저장됩니다.
      </p>
    </div>
    <hr className="border-gray-300 mb-4" />

    {tabValue === "찜한 상품" && (
      <div>
        <p className="font-bold mb-4">전체 {wishlistItems.length}개</p>
        {wishlistItems.map((item, index) => (
          <WishlistItem key={index} item={item} />
        ))}
      </div>
    )}
    {/* 탭 내용 추가 */}
  </Card>
);

const MyPage = () => {
  const user = useSelector((state) => state.auth.userData);

  const wishlistItems = [
    {
      name: "대추방울토마토 750g",
      image:
        "https://contents.lotteon.com/itemimage/20240712170457/LO/17/87/44/78/83/_1/78/74/47/88/4/LO1787447883_1787447884_1.jpg/dims/optimize/dims/resizemc/400x400",
      price: 8990,
      originalPrice: 9990,
      discountRate: 10,
    },
    {
      name: "아삭 복숭아 1.2kg [품종:오도로끼-(딱복)]",
      image:
        "https://img-cf.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/shop/data/goods/1500627673391l0.jpg",
      price: 14900,
      originalPrice: 16900,
      discountRate: 11,
    },
    {
      name: "[스윗밸런스] 오늘의 샐러드 10종 (리뉴얼) (택1)",
      image:
        "https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/d8af0f6f-f092-417c-99df-542cad8e3a9c.jpeg",
      price: 5022,
      originalPrice: 5400,
      discountRate: 7,
    },
    {
      name: "[압구정눅진] 낙지 볶음 2종 (택1)",
      image:
        "https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/c056cd29-7df6-4b60-97c5-ea360da4707f.jpg?v=0418",
      price: 7900,
      originalPrice: 9900,
      discountRate: 20,
    },
    {
      name: "대추방울토마토 750g",
      image:
        "https://contents.lotteon.com/itemimage/20240712170457/LO/17/87/44/78/83/_1/78/74/47/88/4/LO1787447883_1787447884_1.jpg/dims/optimize/dims/resizemc/400x400",
      price: 8990,
      originalPrice: 9990,
      discountRate: 10,
    },
    {
      name: "[압구정눅진] 낙지 볶음 2종 (택1)",
      image:
        "https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/c056cd29-7df6-4b60-97c5-ea360da4707f.jpg?v=0418",
      price: 7900,
      originalPrice: 9900,
      discountRate: 20,
    },
    {
      name: "대추방울토마토 750g",
      image:
        "https://contents.lotteon.com/itemimage/20240712170457/LO/17/87/44/78/83/_1/78/74/47/88/4/LO1787447883_1787447884_1.jpg/dims/optimize/dims/resizemc/400x400",
      price: 8990,
      originalPrice: 9990,
      discountRate: 10,
    },
    {
      name: "[압구정눅진] 낙지 볶음 2종 (택1)",
      image:
        "https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/c056cd29-7df6-4b60-97c5-ea360da4707f.jpg?v=0418",
      price: 7900,
      originalPrice: 9900,
      discountRate: 20,
    },
    {
      name: "아삭 복숭아 1.2kg [품종:오도로끼-(딱복)]",
      image:
        "https://img-cf.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/shop/data/goods/1500627673391l0.jpg",
      price: 14900,
      originalPrice: 16900,
      discountRate: 11,
    },
    {
      name: "[스윗밸런스] 오늘의 샐러드 10종 (리뉴얼) (택1)",
      image:
        "https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/d8af0f6f-f092-417c-99df-542cad8e3a9c.jpeg",
      price: 5022,
      originalPrice: 5400,
      discountRate: 7,
    },
    {
      name: "아삭 복숭아 1.2kg [품종:오도로끼-(딱복)]",
      image:
        "https://img-cf.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/shop/data/goods/1500627673391l0.jpg",
      price: 14900,
      originalPrice: 16900,
      discountRate: 11,
    },
    {
      name: "[스윗밸런스] 오늘의 샐러드 10종 (리뉴얼) (택1)",
      image:
        "https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/d8af0f6f-f092-417c-99df-542cad8e3a9c.jpeg",
      price: 5022,
      originalPrice: 5400,
      discountRate: 7,
    },

    // 임의의 아이템값
  ];
  return (
    <div className="flex w-full h-full justify-center mt-24 bg-[#e2e8f0] pt-5 ">
      <div className="items-start">
        <div className="w-full max-w-screen-xl h-auto flex gap-8">
          <Tabs
            defaultValue="찜한 상품"
            className="w-full flex gap-8 text-left"
          >
            <div className="w-full h-auto">
              <UserInfo user={user} />
              <Card className="h-auto mb-6 bg-white">
                <TabsList className="flex flex-col items-stretch h-auto">
                  <TabsTrigger
                    value="찜한 상품"
                    className="justify-between h-16"
                  >
                    <span>찜한 상품</span>
                    <span>{wishlistItems.length}</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="경매 신청 내역"
                    className="justify-start h-16"
                  >
                    경매 신청 내역
                  </TabsTrigger>
                  <TabsTrigger
                    value="경매 판매 내역"
                    className="justify-start h-16"
                  >
                    경매 판매 내역
                  </TabsTrigger>
                </TabsList>
              </Card>
              <Card className="h-auto bg-white">
                <TabsList className="flex flex-col items-stretch h-auto">
                  <TabsTrigger
                    value="개인정보 수정"
                    className="justify-between h-16"
                  >
                    <span>개인정보 수정</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="배송지 관리"
                    className="justify-start h-16"
                  >
                    배송지 관리
                  </TabsTrigger>
                </TabsList>
              </Card>
            </div>
            <div className="w-full h-auto">
              <div className="h-full flex flex-col">
                <TabsContent value="찜한 상품">
                  <ContentArea
                    tabValue="찜한 상품"
                    wishlistItems={wishlistItems}
                  />
                </TabsContent>
                <TabsContent value="경매 신청 내역">
                  <ContentArea tabValue="경매 신청 내역" wishlistItems={[]} />
                </TabsContent>
                <TabsContent value="경매 판매 내역">
                  <ContentArea tabValue="경매 판매 내역" wishlistItems={[]} />
                </TabsContent>
                <TabsContent value="개인정보 수정">
                  <ContentArea tabValue="개인정보 수정" wishlistItems={[]} />
                </TabsContent>
                <TabsContent value="배송지 관리">
                  <ContentArea tabValue="배송지 관리" wishlistItems={[]} />
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
