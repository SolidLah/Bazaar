import { useMemo } from "react";
import useAllUsers from "./useAllUsers";

export default function useAllCreators() {
  const { values, loading, error } = useAllUsers({ includeSelf: false });

  const data = useMemo(
    () => (values ? values.filter((user) => user.collections) : null),
    [values]
  );

  return { data, loading, error };
}
