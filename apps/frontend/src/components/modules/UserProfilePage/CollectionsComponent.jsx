import { Center, Flex, Spinner } from "@chakra-ui/react";
import { useCollections, useFetchCollections } from "src/lib/hooks";
import CollectionsCard from "./CollectionsCard";

const CollectionsComponent = ({ userData }) => {
  const collectionsArray = useCollections(userData);
  const { collections, loading } = useFetchCollections(collectionsArray);

  if (loading) {
    return <Spinner color="gray" size="xl" />;
  }

  if (!collections && !loading) {
    return <Center>No collections</Center>;
  }

  if (collections.length <= 0) {
    return <Center>No collections</Center>;
  }

  return (
    <Flex gap={6} justify="flex-start" wrap="wrap">
      {collections.map((collection, index) => (
        <CollectionsCard key={index} collection={collection} />
      ))}
    </Flex>
  );
};

export default CollectionsComponent;
