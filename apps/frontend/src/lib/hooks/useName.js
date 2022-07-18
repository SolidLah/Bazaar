import { useMemo } from "react";

export default function useName(userData) {
  return useMemo(() => (userData ? userData.get("name") : null), [userData]);
}
