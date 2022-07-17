import { useMemo } from "react";

export default function useQueryByName(query, items) {
  return useMemo(() => {
    if (!query || !items) return items;

    const capsQuery = query.toUpperCase();
    const res = items.filter((item) => {
      const capsName = item.nftData.name.toUpperCase();
      return capsName.includes(capsQuery);
    });
    return res;
  }, [query, items]);
}
