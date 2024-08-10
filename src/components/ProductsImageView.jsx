import { useState, useRef } from "react";
import { Carousel } from "@/components/ui/carousel";
function ProductsImageView({ images, productName, startingPrice }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSelect = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="p-2 bg-white rounded-lg h-max ">
      <div className="flex items-center justify-between h-[65px]">
        <p className="ml-3 text-2xl font-bold">{productName}</p>
        <p className="text-xl font-semibold text-right">
          시작 가격: {startingPrice} 원
        </p>
      </div>

      <Carousel className="items-center justify-center flex">
        {images.map((image, index) => (
          <div
            key={index}
            style={{ display: currentIndex === index ? "block" : "none" }}
          >
            <img
              src={image.url}
              alt={`Slide ${index}`}
              style={{
                width: "450px",
                height: "450px",
                borderRadius: "5px",
                border: "2px solid #b5e4ff",
              }}
            />
          </div>
        ))}
      </Carousel>
      <div
        className="thumbnail-container"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Thumbnail ${index}`}
            style={{
              width: "60px",
              height: "60px",
              margin: "0 5px",
              cursor: "pointer",
              border: currentIndex === index ? "2px solid #40A6FD" : "none",
            }}
            onClick={() => handleSelect(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductsImageView;
