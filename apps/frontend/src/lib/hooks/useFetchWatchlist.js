import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchWatchlist(watchlistArray) {
  const [watchlist, setWatchlist] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!watchlistArray) {
        return;
      }
      const res = await Promise.all(
        watchlistArray.map(
          async (id) => (await axios.get(`/api/listings/${id}`)).data.msg
        )
      );
      if (!active) {
        return;
      }
      setWatchlist(res);
    };

    let active = true;
    setLoading(true);
    load();
    setLoading(false);
    return () => {
      active = false;
    };
  }, [watchlistArray]);

  return { watchlist, loading };
}
