import { useMemo } from "react";

export default function useFollowing(userData) {
  return useMemo(
    () => (userData ? userData.get("following") : null),
    [userData]
  );
}
