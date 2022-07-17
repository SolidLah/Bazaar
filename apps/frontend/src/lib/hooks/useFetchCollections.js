import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchCollections(collectionsArray) {
  const [collections, setCollections] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!collectionsArray) {
        return;
      }
      const res = await Promise.all(
        collectionsArray.map(async (address) => {
          let res;

          try {
            res = (await axios.get(`/api/collections/${address}/info`)).data
              .msg;
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
      setCollections(res);
    };

    let active = true;
    setLoading(true);
    load();
    setLoading(false);
    return () => {
      active = false;
    };
  }, [collectionsArray]);

  return { collections, loading };
}
