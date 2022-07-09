import { Center, Flex } from "@chakra-ui/react";
import LinkedCard from "src/components/common/ui/LinkedCard/LinkedCard";

const UserListingsComponent = ({ listed }) => {
  if (!listed) {
    return <Center>No listings</Center>;
  }

  return listed?.length > 0 ? (
    <Flex wrap="wrap" justify="flex-start">
      {listed.map((item) => (
        <LinkedCard key={item.itemId} item={item} watchlistEnabled={false} />
      ))}
    </Flex>
  ) : (
    <Center>No listings</Center>
  );
};

export default UserListingsComponent;
