import { Center, Flex, Spinner } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import { useFetchCollections } from "src/lib/hooks";
import CollectionsCard from "./CollectionsCard";

const CollectionsComponent = ({ data, isMyProfile }) => {
  const collectionsArray = data?.collections;
  const { collections, loading } = useFetchCollections(collectionsArray);

  if (loading) {
    return <Spinner color="gray" size="xl" />;
  }

  if (isEmpty(collections)) {
    return <Center>No collections</Center>;
  }

  return (
    <Flex gap="0.7rem" direction="column">
      {collections.map((collection, index) => {
        if (collection)
          return (
            <CollectionsCard
              key={index}
              collection={collection}
              isMyProfile={isMyProfile}
            />
          );
      })}
    </Flex>
  );
};

export default CollectionsComponent;
