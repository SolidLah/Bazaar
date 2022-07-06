import { Flex } from "@chakra-ui/react";
import LinkedCard from "src/components/common/ui/LinkedCard/LinkedCard";

const ListingsGrid = ({ items }) => {
  return (
    <Flex w="100%" h="100%" wrap="wrap" justify="flex-start">
      {items.map((item) => (
        <LinkedCard key={item.itemId} item={item} watchlistEnabled={true} />
      ))}
    </Flex>
  );
};

export default ListingsGrid;
