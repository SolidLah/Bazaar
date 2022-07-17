import { useMemo } from "react";

export default function useQueryByPrice(range, items) {
  return useMemo(() => {
    if ((!range.lower && !range.upper) || !items) return items;

    const res = items.filter((item) => {
      const itemPrice = item.marketPrice;
      if (!range.lower && range.upper) return itemPrice <= range.upper;
      if (range.lower && !range.upper) return range.lower <= itemPrice;
      if (range.lower && range.upper)
        return range.lower <= itemPrice && itemPrice <= range.upper;
    });
    return res;
  }, [range, items]);
}
