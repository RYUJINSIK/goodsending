import { ShoppingBasket, Users, HandCoins } from "lucide-react";
function BiddingInfo({ biddata }) {
  const uniqueBidders = new Set(biddata.map((bid) => bid.memberId)).size;

  return (
    <div className="flex justify-between items-center mt-4">
      <div>
        <Users className="inline-block mr-2" />
        <span>입찰자 수: {uniqueBidders}</span>
      </div>
      <div>
        <HandCoins className="inline-block mr-2" />
        <span>총 입찰 건수: {biddata.length}</span>
      </div>
    </div>
  );
}

export default BiddingInfo;
