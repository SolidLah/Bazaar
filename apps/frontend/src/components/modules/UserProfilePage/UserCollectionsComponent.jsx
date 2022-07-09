import { Flex } from "@chakra-ui/react";
import UserCollectionsCard from "./UserCollectionsCard";

const UserCollectionsComponent = ({ collections }) => {
  return (
    <Flex gap={6} justify="flex-start" wrap="wrap">
      {collections.map((collection, index) => (
        <UserCollectionsCard key={index} collection={collection} />
      ))}
    </Flex>
  );
};

export default UserCollectionsComponent;
