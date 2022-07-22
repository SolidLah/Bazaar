import useAllUsers from "./useAllUsers";

export default function useFetchFollowing(followingArray) {
  const { values, loading, error } = useAllUsers();

  const data =
    values && followingArray
      ? values.filter((user) => followingArray.includes(user.uid))
      : null;

  return { data, loading, error };
}
