import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Login from "@/components/Login";
import {
  getProducts,
  getTOPLikeProducts,
  getTOPBidProducts,
} from "@/api/productApi";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";

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

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState({
    id: undefined,
    status: undefined,
    startDateTime: undefined,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [auctionStatus, setAuctionStatus] = useState("all");
  const [isAuctionTime, setIsAcutionTime] = useState(false);

  const checkTime = () => {
    const now = new Date();
    const hours = now.getHours();
    // 12시~15시 또는 18시~21시인지 확인
    return (hours >= 12 && hours < 15) || (hours >= 18 && hours < 21);
  };
  const observer = useRef();

  const lastProductElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchProducts = async (isInitialSearch = false) => {
    setLoading(true);
    try {
      let openProduct = false;
      let closedProduct = false;

      if (auctionStatus === "ongoing") {
        openProduct = true;
      } else if (auctionStatus === "ended") {
        closedProduct = true;
      }

      const currentCursor = isInitialSearch
        ? { id: undefined, status: undefined, startDateTime: undefined }
        : cursor;

      const response = await getProducts(
        currentCursor,
        searchTerm,
        openProduct,
        closedProduct
      );
      const newProducts = response.content;
      console.log("newProducts ? ", newProducts);

      setProducts((prevProducts) =>
        isInitialSearch ? newProducts : [...prevProducts, ...newProducts]
      );

      if (newProducts.length > 0) {
        const lastProduct = newProducts[newProducts.length - 1];
        setCursor({
          id: lastProduct.productId,
          status: lastProduct.status,
          startDateTime: lastProduct.startDateTime,
        });
      }
      setHasMore(newProducts.length > 0);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // 검색 버튼 클릭 핸들러
  const handleSearch = () => {
    setProducts([]);
    setCursor({
      id: undefined,
      status: undefined,
      startDateTime: undefined,
    });
    fetchProducts(true); // true를 전달하여 초기 검색임을 표시
  };
  useEffect(() => {
    if (page > 1) {
      fetchProducts();
    }
  }, [page]);

  useEffect(() => {
    const fetchData = async () => {
      const auctionTime = checkTime();
      setIsAcutionTime(auctionTime);
      console.log("auctionTime ? : ", auctionTime);
      try {
        let result;
        if (auctionTime) {
          result = await getTOPBidProducts(); // A API 호출
        } else {
          result = await getTOPLikeProducts(); // B API 호출
        }
        console.log("time Data ? : ", result);
        console.log("time DataLength ? : ", result.length);
        console.log(result);
        setTopProducts(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    fetchProducts(true);
  }, []);

  // useEffect(() => {
  //   setProducts([]);
  //   setCursor({
  //     id: undefined,
  //     status: undefined,
  //     startDateTime: undefined,
  //   });
  //   fetchProducts();
  // }, [searchTerm, auctionStatus]);

  const ProductCardExample = ({ title, startingPrice, imageUrl }) => (
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
          <ProductCardExample
            key={index}
            title={`매물 이름 ${index + 1}`}
            startingPrice={1000 + index * 500}
            imageUrl={images[index % images.length]}
          />
        ))}
      </div>

      <div className="flex items-center justify-stretch mt-4">
        <h2 className="text-2xl font-bold mx-4">전체 상품 보기</h2>
        <div className="relative w-64 mr-4">
          <input
            type="text"
            placeholder="검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
        <select
          value={auctionStatus}
          onChange={(e) => setAuctionStatus(e.target.value)}
          className="border rounded-full p-2 mt-2 mb-4"
        >
          <option value="all">전체</option>
          <option value="ongoing">진행중</option>
          <option value="ended">종료</option>
        </select>
        <Button onClick={handleSearch} className="ml-4">
          검색
        </Button>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={index === products.length - 1 ? lastProductElementRef : null}
              onClick={() => {
                navigate(`product/${product.productId}`);
              }}
              className="cursor-pointer w-full"
            >
              <ProductCard product={product} />
            </div>
          ))}
          {loading &&
            Array(5)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4"
                >
                  <ProductSkeleton />
                </div>
              ))}
        </div>
      </div>
      <Login isOpen={isLoginOpen} onClose={closeLogin} />
    </div>
  );
};

export default Main;
