import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function ProductSkeleton() {
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <Skeleton className="h-4 w-[250px]" />
      </CardHeader>
      <CardContent>
        <Skeleton className="w-full h-[200px]" />
        <Skeleton className="h-4 w-[200px] mt-2" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-10 w-[100px] ml-auto" />
      </CardFooter>
    </Card>
  );
}

export default ProductSkeleton;
