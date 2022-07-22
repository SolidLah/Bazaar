import useAllUsers from "./useAllUsers";

export default function useFetchUserFromWalletAddress(address) {
  const { values, loading, error } = useAllUsers();

  const data =
    values && address
      ? values.filter((user) => user.walletAddress === address)[0]
      : null;

  return { data, loading, error };
}
