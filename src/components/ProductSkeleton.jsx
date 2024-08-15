import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function ProductSkeleton() {
  return (
    <Card className="overflow-hidden w-[225px] bg-gray-100">
      <CardHeader>
        <Skeleton className="w-[250px] h-max overflow-hidden" />
      </CardHeader>
      <CardContent className="p-4">
        <Skeleton className="w-full h-[200px]" />
        <Skeleton className="h-4 w-[200px] mt-2" />
      </CardContent>
    </Card>
  );
}

export default ProductSkeleton;
