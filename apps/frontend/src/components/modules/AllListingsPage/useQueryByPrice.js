import { useMemo } from "react";

export default function useQueryByPrice(range, items) {
  return useMemo(() => {
    const lower = ~~range.lower;
    const upper = ~~range.upper;

    if ((!lower && !upper) || !items) return items;

    const res = items.filter((item) => {
      const itemPrice = ~~item.marketPrice;

      if (!lower && upper) return itemPrice <= range.upper;
      if (lower && !upper) return range.lower <= itemPrice;
      if (lower && upper)
        return range.lower <= itemPrice && itemPrice <= range.upper;
    });
    return res;
  }, [range, items]);
}
