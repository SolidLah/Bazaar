import { Center, Spinner } from "@chakra-ui/react";
import axios from "axios";
import ErrorLayout from "src/components/common/layouts/ErrorLayout";
import useSWR from "swr";
import UserDetailsGrid from "./UserDetailsGrid";
import UserItemsGrid from "./UserItemsGrid";
import WatchlistGrid from "./WatchlistGrid";
import {
  useFirestoreUserData,
  useStoredAddress,
  useWatchlist,
  useFetchWatchlist,
} from "src/lib/hooks";

const UserProfile = () => {
  const { user, userData, error } = useFirestoreUserData();
  const storedAddress = useStoredAddress(userData);
  const watchlistArray = useWatchlist(userData);
  const { watchlist, loading: watchlistLoading } =
    useFetchWatchlist(watchlistArray);

  const { data: userItems } = useSWR(
    storedAddress ? "/api/listings/user/" + storedAddress : null,
    (url) => axios.get(url).then((res) => res.data.msg),
    { revalidateOnFocus: false }
  );

  if (error) {
    return <ErrorLayout />;
  }

  return (
    <Center w="100%" flexDirection="column" mt={20} mb={200} gap={10}>
      {user && storedAddress ? (
        <UserDetailsGrid user={user} fireStoredAddress={storedAddress} />
      ) : (
        <Spinner size="xl" color="gray" />
      )}
      {!watchlistLoading && watchlist && watchlist.length > 0 ? (
        <WatchlistGrid watchlist={watchlist} />
      ) : (
        <Spinner size="xl" color="gray" />
      )}
      {userItems ? (
        <UserItemsGrid items={userItems} />
      ) : (
        <Spinner size="xl" color="gray" />
      )}
    </Center>
  );
};

export default UserProfile;
