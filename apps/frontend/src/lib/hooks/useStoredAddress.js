import { useMemo } from "react";

export default function useStoredAddress(userData) {
  return useMemo(
    () => (userData ? userData.get("walletAddress") : null),
    [userData]
  );
}
