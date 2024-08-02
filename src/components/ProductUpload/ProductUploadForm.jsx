import React from "react";
import ProductUploadForm from "../components/ProductUpload/ProductUploadForm";

const ProductUpload = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">상품 등록</h2>
      <ProductUploadForm />
    </div>
  );
};

export default ProductUpload;
