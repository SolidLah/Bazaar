import { Container } from "@chakra-ui/react";
import axios from "axios";
import { useContext } from "react";
import ErrorLayout from "src/components/common/layouts/ErrorLayout";
import LoadingLayout from "src/components/common/layouts/LoadingLayout";
import { userContext } from "src/contexts/userContext";
import useSWR from "swr";
import HeaderComponent from "./HeaderComponent";
import ListingsComponent from "./ListingsComponent";

const CollectionDetailsPage = ({ address }) => {
  const { data } = useContext(userContext);
  const userCollections = data?.collections;
  const isOwner = userCollections?.includes(address);

  const fetcher = (url) => axios.get(url).then((res) => res.data.msg);

  const { data: collection, error } = useSWR(
    address ? `/api/collections/${address}` : null,
    fetcher
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
        isOwner={isOwner}
      />
      <ListingsComponent items={collection.listed} />
    </Container>
  );
};

export default CollectionDetailsPage;
