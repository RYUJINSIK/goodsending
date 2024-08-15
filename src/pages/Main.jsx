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
import Top5ProductCard from "@/components/Top5ProductCard";
import { Crown, Gift } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { useSelector } from "react-redux";

const Main = () => {
  const token = useSelector((state) => state.auth.access_token);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getMyProducts(token);
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    if (token) {
      fetchProducts();
    }
    const shouldLoginModal = localStorage.getItem("showLoginModal");
    if (shouldLoginModal === "true") {
      openLogin();
      localStorage.removeItem("showLoginModal"); // 모달을 한 번만 표시하기 위해 삭제
    }
  }, [token]);

  const images = [
    "../icon/banner1.png",
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
          result = await getTOPBidProducts(); // 입찰순 API 호출
        } else {
          result = await getTOPLikeProducts(); // 좋아요순 API 호출
        }
        console.log("TOP5 ? : ", result);
        setTopProducts(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    fetchProducts(true);
  }, []);

  return (
    <div className="container mx-auto p-4 mt-24">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
      >
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
      </Carousel>
      <div className="flex flex-row items-center space-x-4 mt-8 mb-4">
        <Crown className="h-8 w-8 text-white bg-yellow-400 p-1 rounded-lg" />
        <p className="text-2xl font-bold">
          {isAuctionTime ? "실시간 입찰수 TOP5 매물" : "찜하기 TOP5 매물"}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
        {topProducts.map((topProduct) => (
          <div
            key={topProduct.id}
            onClick={() => {
              navigate(`product/${topProduct.productId}`);
            }}
            className="cursor-pointer w-full"
          >
            <Top5ProductCard product={topProduct} />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between bg-white mt-8">
        <div className="flex flex-row items-center space-x-4 mt-8 mb-4">
          <Gift className="h-8 w-8 text-white bg-sky-500 p-1 rounded-lg" />
          <p className="text-2xl font-bold">상품 목록</p>
        </div>

        <div className="flex flex-wrap items-center space-x-4 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0 md:w-64">
            <input
              type="text"
              placeholder="상품명 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleSearch}
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
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">전체</option>
            <option value="ongoing">진행중</option>
            <option value="ended">종료</option>
          </select>
        </div>
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
