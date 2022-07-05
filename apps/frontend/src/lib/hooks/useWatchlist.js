import { useMemo } from "react";

export default function useWatchlist(userData) {
  return useMemo(
    () => (userData ? userData.get("watchlist") : null),
    [userData]
  );
}
