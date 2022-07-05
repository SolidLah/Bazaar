import { Center, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useMemo } from "react";
import ErrorLayout from "src/components/common/layouts/ErrorLayout";
import useSWR from "swr";
import UserDetailsGrid from "./UserDetailsGrid";
import UserItemsGrid from "./UserItemsGrid";
import WatchlistGrid from "./WatchlistGrid";
import stubItems from "src/lib/stubData";
import { useFirestoreUserData } from "src/lib/hooks";

const UserProfile = () => {
  const { user, userData, error } = useFirestoreUserData();

  const storedAddress = useMemo(
    () => (userData ? userData.get("walletAddress") : null),
    [userData]
  );

  const watchlistArray = useMemo(
    () => (userData ? userData.get("watchlist") : null),
    [userData]
  );

  const { data: userItems } = useSWR(
    storedAddress ? "/api/listings/user/" + storedAddress : null,
    (url) => axios.get(url).then((res) => res.data.msg)
  );

  /* const { data: watchlist } = useSWR(
    ["/api/listings/watchlist/", watchlistArray],
    (url, array) =>
  ); */

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
      <WatchlistGrid watchlist={stubItems.userListings} />
      {userItems ? (
        <UserItemsGrid items={userItems} />
      ) : (
        <Spinner size="xl" color="gray" />
      )}
    </Center>
  );
};

export default UserProfile;
