import { Flex, Heading, Center } from "@chakra-ui/react";
import LinkedCard from "src/components/common/ui/LinkedCard/LinkedCard";
import Card from "src/components/common/ui/Card/Card";

const UserItemsComponent = ({ items }) => {
  const listed = items?.listed;
  const owned = items?.owned;

  return (
    <Flex direction="column" gap={6}>
      <Center>
        <Heading>Listings</Heading>
      </Center>
      {listed?.length > 0 ? (
        <Flex wrap="wrap" justify="flex-start">
          {listed.map((item) => (
            <LinkedCard
              key={item.itemId}
              item={item}
              watchlistEnabled={false}
            />
          ))}
        </Flex>
      ) : (
        <Center>No listings</Center>
      )}
      <Center>
        <Heading>Owned NFTs</Heading>
      </Center>
      {owned?.length > 0 ? (
        <Flex wrap="wrap" justify="flex-start">
          {owned.map((item) => (
            <Card key={item.itemId} item={item} />
          ))}
        </Flex>
      ) : (
        <Center>No NFTs owned</Center>
      )}
    </Flex>
  );
};

export default UserItemsComponent;