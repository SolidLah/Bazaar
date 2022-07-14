import { Flex, Heading } from "@chakra-ui/react";
import LinkedCard from "src/components/common/ui/LinkedCard/LinkedCard";

const ListingsComponent = ({ listings }) => {
  return (
    <Flex w="100%" direction="column" gap={6}>
      <Heading>Listings</Heading>
      <Flex justify="flex-start" wrap="wrap" gap={6}>
        {listings.map((item) => (
          <LinkedCard key={item.itemId} item={item} watchlistEnabled={true} />
        ))}
      </Flex>
    </Flex>
  );
};

export default ListingsComponent;
