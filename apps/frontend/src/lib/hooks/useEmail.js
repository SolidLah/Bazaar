import { useMemo } from "react";

export default function useEmail(userData) {
  return useMemo(() => (userData ? userData.get("email") : null), [userData]);
}
