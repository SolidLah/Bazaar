import { Center, Flex } from "@chakra-ui/react";
import UserCollectionsCard from "./UserCollectionsCard";

const UserCollectionsComponent = ({ collections }) => {
  if (!collections || collections?.length <= 0) {
    return <Center>No collections</Center>;
  }

  return (
    <Flex gap={6} justify="flex-start" wrap="wrap">
      {collections.map((collection, index) => (
        <UserCollectionsCard key={index} collection={collection} />
      ))}
    </Flex>
  );
};

export default UserCollectionsComponent;
