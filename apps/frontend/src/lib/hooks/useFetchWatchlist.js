import { useEffect, useState } from "react";
import axios from "axios";
import { isEmpty } from "lodash";

export default function useFetchWatchlist(watchlistArray) {
  const [watchlist, setWatchlist] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (isEmpty(watchlistArray)) {
        return;
      }
      const res = await Promise.all(
        watchlistArray.map(async (id) => {
          let res;

          try {
            res = (await axios.get(`/api/listings/${id}`)).data.msg;
          } catch (error) {
            console.log(error);
            res = null;
          }

          return res;
        })
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
