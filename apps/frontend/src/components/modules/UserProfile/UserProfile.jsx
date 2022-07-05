import { Center, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { doc } from "firebase/firestore";
import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import ErrorLayout from "src/components/common/layouts/ErrorLayout";
import { auth, db } from "src/lib/firebase";
import useSWR from "swr";
import DetailsGrid from "./DetailsGrid";
import ItemsGrid from "./ItemsGrid";
import WatchlistGrid from "./WatchlistGrid";
import stubItems from "src/lib/stubData";

const UserProfile = () => {
  const [user, authLoading, authError] = useAuthState(auth);
  const [userData, docLoading, docError] = useDocument(
    doc(db, "users", user.uid),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

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

  if (authError) {
    return <ErrorLayout />;
  }

  return (
    <Center w="100%" flexDirection="column" mt={20} mb={200} gap={10}>
      {user && storedAddress ? (
        <DetailsGrid user={user} fireStoredAddress={storedAddress} />
      ) : (
        <Spinner size="xl" color="gray" />
      )}
      <WatchlistGrid watchlist={stubItems.userListings} />
      {userItems ? (
        <ItemsGrid items={userItems} />
      ) : (
        <Spinner size="xl" color="gray" />
      )}
    </Center>
  );
};

export default UserProfile;
