import { useMemo } from "react";
import useAllUsers from "./useAllUsers";

export default function useAllCreators() {
  const { values, loading, error } = useAllUsers();

  const data = useMemo(
    () =>
      values ? values.filter((user) => user.collections.length > 0) : null,
    [values]
  );

  return { data, loading, error };
}
