import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function ProductCard({ product }) {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img
          src={product.thumbnailUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-sm text-gray-600">
          경매 시작 가격: {product.price}원
        </p>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
