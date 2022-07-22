import { useContext, useMemo } from "react";
import { userContext } from "src/contexts/userContext";
import { addToWatchlist, removeFromWatchlist } from "src/lib/helpers";
import { useToastedCallback } from "src/lib/hooks";

const useComponentState = (item) => {
  const { authState, firestoreHook } = useContext(userContext);
  const [user] = authState;
  const { data } = firestoreHook;
  const watchlistArray = data?.watchlist;

  const itemInWatchlist = useMemo(
    () => (watchlistArray ? watchlistArray.includes(item.itemId) : false),
    [watchlistArray, item]
  );

  const isOwner = useMemo(
    () => (item && data ? item.owner === data.walletAddress : false),
    [item, data]
  );

  const callBack = async () => {
    if (!user) throw new Error("Not logged in");

    if (itemInWatchlist) {
      await removeFromWatchlist(user.uid, item.itemId);
    } else {
      await addToWatchlist(user.uid, item.itemId);
    }
  };

  const { toastedCallback, loading } = useToastedCallback(
    "Add to watchlist",
    callBack,
    false
  );

  return { toastedCallback, loading, itemInWatchlist, isOwner };
};

export default useComponentState;
