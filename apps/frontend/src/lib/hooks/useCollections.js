import { useMemo } from "react";

export default function useCollections(userData) {
  return useMemo(
    () => (userData ? userData.get("collections") : null),
    [userData]
  );
}
