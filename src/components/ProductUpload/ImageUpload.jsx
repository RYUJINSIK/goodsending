import React from "react";

import { Card } from "@/components/ui/card";

const ImageUpload = ({ index, image, onChange }) => {
  return (
    <div className="relative">
      <Card className="border-dashed border-2 border-gray-400 h-32 flex items-center justify-center cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onChange(index, e)}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />

        {image ? (
          <img
            src={image}
            alt={`업로드된 이미지 ${index + 1}`}
            className="h-full object-cover rounded"
          />
        ) : (
          <span className="text-gray-500">이미지 업로드</span>
        )}
      </Card>
    </div>
  );
};

export default ImageUpload;
