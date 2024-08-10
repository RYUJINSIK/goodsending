import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSelector } from "react-redux";
import { CircleDollarSign } from "lucide-react";

export function Bidding({ callPostBids }) {
  const [currentHighPrice, setCurrentHighPrice] = useState(0);
  const [cash, setCash] = useState(0);
  const [bidPrice, setBidPrice] = useState(0);
  const [balance, setBalance] = useState(0);
  const user = useSelector((state) => state.auth.userData);

  useEffect(() => {
    console.log(user);
    setCash(user.cash);
  }, []);
  const handleSubmit = async () => {
    await callPostBids(bidPrice, 0);
    // 여기에 모달을 닫거나 다른 후속 작업을 수행하는 로직을 추가하세요
  };

  const handleBidPriceChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setBidPrice(value);
    setBalance(cash - value);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button primary className="text-xl w-1/2 h-14">
          <CircleDollarSign className="mr-2" /> 입찰하기
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-200 bg-white">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold leading-none">입찰하기</h4>
            <p className="text-sm text-muted-foreground">
              입찰 신청할 금액을 입력하세요
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="currentHighPrice">현재 최대입찰 금액</Label>
              <Input
                id="currentHighPrice"
                value={currentHighPrice}
                onChange={(e) =>
                  setCurrentHighPrice(parseInt(e.target.value, 10))
                }
                className="col-span-2 h-8"
                readOnly
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="cash">캐쉬 잔액</Label>
              <Input
                id="cash"
                value={cash}
                onChange={(e) => setCash(parseInt(e.target.value, 10))}
                className="col-span-2 h-8"
                readOnly
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="bidPrice">입찰 금액</Label>
              <Input
                id="bidPrice"
                value={bidPrice}
                onChange={handleBidPriceChange}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="balance">입찰 신청 후 금액</Label>
              <Input
                id="balance"
                value={balance}
                className="col-span-2 h-8"
                readOnly
              />
            </div>
          </div>
          <Button primary onClick={handleSubmit}>
            입찰하기
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default Bidding;
