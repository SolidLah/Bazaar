import { Container, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import ErrorLayout from "src/components/common/layouts/ErrorLayout";
import { auth } from "src/lib/firebase";
import {
  useFetchWatchlist,
  useFirestoreUserData,
  useStoredAddress,
  useWatchlist,
} from "src/lib/hooks";
import stubItems from "src/lib/stubData";
import useSWR from "swr";
import TabsComponent from "./TabsComponent";
import UserDetailsComponent from "./UserDetailsComponent";

const UserProfilePage = () => {
  const [user, authLoading, authError] = useAuthState(auth);
  const { userData, error: firestoreError } = useFirestoreUserData(user);
  const storedAddress = useStoredAddress(userData);
  const watchlistArray = useWatchlist(userData);
  const { watchlist, loading: watchlistLoading } =
    useFetchWatchlist(watchlistArray);

  const { data: userItems } = useSWR(
    storedAddress ? "/api/listings/user/" + storedAddress : null,
    (url) => axios.get(url).then((res) => res.data.msg),
    { revalidateOnFocus: false }
  );

  if (authError || firestoreError) {
    return <ErrorLayout />;
  }

  return (
    <Container maxW="container.xl" mt={20}>
      <Flex gap={6} justify="flex-start">
        <UserDetailsComponent user={user} fireStoredAddress={storedAddress} />
        <TabsComponent
          watchlist={watchlist}
          items={userItems}
          collections={stubItems.collections}
        />
      </Flex>
    </Container>
  );
};

export default UserProfilePage;
