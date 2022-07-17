import { useMemo } from "react";
import useSearchStore from "src/stores/searchStore";

export default function useQueriedItems() {
  const items = useSearchStore((state) => state.items);
  const nameQuery = useSearchStore((state) => state.nameQuery);
  const priceRange = useSearchStore((state) => state.priceRange);

  return useMemo(() => {
    const capsNameQuery = nameQuery.toUpperCase();
    const priceLower = ~~priceRange.lower;
    const priceUpper = ~~priceRange.upper;

    return items.filter((item) => {
      const namePred = item.nftData.name.toUpperCase().includes(capsNameQuery);
      const pricePred = (() => {
        const itemPrice = ~~item.marketPrice;
        if (!priceLower && !priceUpper) return true;
        if (!priceLower && priceUpper) return itemPrice <= priceUpper;
        if (priceLower && !priceUpper) return priceLower <= itemPrice;
        if (priceLower && priceUpper)
          return priceLower <= itemPrice && itemPrice <= priceUpper;
      })();

      return namePred && pricePred;
    });
  }, [items, nameQuery, priceRange]);
}
