import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchWatchlist(watchlistArray) {
  const [watchlist, setWatchlist] = useState([]);
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
      setLoading(false);
      console.log("set");
    };

    let active = true;
    setLoading(true);
    load();
    return () => {
      active = false;
    };
  }, [watchlistArray]);

  return { watchlist, loading };
}