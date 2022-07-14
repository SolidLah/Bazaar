import { Container } from "@chakra-ui/react";
import axios from "axios";
import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ErrorLayout from "src/components/common/layouts/ErrorLayout";
import LoadingLayout from "src/components/common/layouts/LoadingLayout";
import { auth } from "src/lib/firebase";
import { useCollections, useFirestoreUserData } from "src/lib/hooks";
import useSWR from "swr";
import HeaderComponent from "./HeaderComponent";
import ListingsComponent from "./ListingsComponent";
import MintedComponent from "./MintedComponent";

const CollectionDetailsPage = ({ address }) => {
  const fetcher = (url) => axios.get(url).then((res) => res.data.msg);

  const { data: collection, error } = useSWR(
    `/api/collections/${address}`,
    fetcher
  );

  const [user] = useAuthState(auth);
  const { userData } = useFirestoreUserData(user);
  const userCollections = useCollections(userData);
  const isOwner = useMemo(
    () => (userCollections ? userCollections.includes(address) : null),
    [address, userCollections]
  );

  if (!collection && !error) {
    return <LoadingLayout />;
  }

  if (error) {
    return <ErrorLayout />;
  }

  return (
    <Container
      centerContent
      flexDirection="column"
      justifyContent="center"
      mt={20}
      gap={6}
      maxW="container.xl"
    >
      <HeaderComponent
        address={address}
        name={collection.info.name}
        symbol={collection.info.symbol}
      />
      <ListingsComponent listings={collection.listed} />
      {isOwner && <MintedComponent minted={collection.unlisted} />}
    </Container>
  );
};

export default CollectionDetailsPage;
