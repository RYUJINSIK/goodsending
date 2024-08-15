import { useMemo } from "react";

export const useFormatPrice = (price) => {
  return useMemo(() => {
    if (price === null || price === undefined) return "";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }, [price]);
};
