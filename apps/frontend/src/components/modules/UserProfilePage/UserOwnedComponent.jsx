import { Center, Flex } from "@chakra-ui/react";
import Card from "src/components/common/ui/Card/Card";

const UserOwnedComponent = ({ owned }) => {
  if (!owned || owned?.length <= 0) {
    return <Center>No NFTs owned</Center>;
  }

  return (
    <Flex wrap="wrap" justify="flex-start" gap={6}>
      {owned.map((item) => (
        <Card key={item.itemId} item={item} />
      ))}
    </Flex>
  );
};

export default UserOwnedComponent;
