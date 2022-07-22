import { Center, Flex, Spinner } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import { useFetchCollections } from "src/lib/hooks";
import CollectionsCard from "./CollectionsCard";

const CollectionsComponent = ({ data }) => {
  const collectionsArray = data?.collections;
  const { collections, loading } = useFetchCollections(collectionsArray);

  if (loading) {
    return <Spinner color="gray" size="xl" />;
  }

  if (isEmpty(collections)) {
    return <Center>No collections</Center>;
  }

  return (
    <Flex gap={6} justify="flex-start" wrap="wrap">
      {collections.map((collection, index) => {
        if (collection)
          return <CollectionsCard key={index} collection={collection} />;
      })}
    </Flex>
  );
};

export default CollectionsComponent;
