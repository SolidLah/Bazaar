import { Center, Flex } from "@chakra-ui/react";
import LinkedCard from "src/components/common/ui/LinkedCard/LinkedCard";

const UserListingsComponent = ({ listed }) => {
  if (!listed || listed?.length <= 0) {
    return <Center>No listings</Center>;
  }

  return (
    <Flex wrap="wrap" justify="flex-start" gap={6}>
      {listed.map((item) => (
        <LinkedCard key={item.itemId} item={item} watchlistEnabled={false} />
      ))}
    </Flex>
  );
};

export default UserListingsComponent;
