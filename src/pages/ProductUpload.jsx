import ProductUploadForm from "@/components/ProductUpload/ProductUploadForm";

const ProductUpload = () => {
  return (
    <div className="container mx-auto p-4 max-w-screen-md">
      {/* <h2 className="text-2xl font-bold mt-8 mb-8">판매 등록</h2> */}
      <ProductUploadForm />
    </div>
  );
};

export default ProductUpload;
