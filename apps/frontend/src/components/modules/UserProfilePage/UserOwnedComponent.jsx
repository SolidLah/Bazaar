import { Center, Flex } from "@chakra-ui/react";
import Card from "src/components/common/ui/Card/Card";

const UserOwnedComponent = ({ owned }) => {
  return owned?.length > 0 ? (
    <Flex wrap="wrap" justify="flex-start">
      {owned.map((item) => (
        <Card key={item.itemId} item={item} />
      ))}
    </Flex>
  ) : (
    <Center>No NFTs owned</Center>
  );
};

export default UserOwnedComponent;
