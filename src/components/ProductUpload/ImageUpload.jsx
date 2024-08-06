import React from "react";

import { Card } from "@/components/ui/card";

const ImageUpload = ({ index, image, onChange }) => {
  return (
    <div className="relative aspect-square">
      <Card className="w-full h-full flex items-center border-2 border-gray-400  justify-center cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onChange(index, e)}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        {image ? (
          <img
            src={image.preview}
            alt={`업로드된 이미지 ${index + 1}`}
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <span className="text-gray-400">이미지 업로드</span>
        )}
      </Card>
    </div>
  );
};

export default ImageUpload;
