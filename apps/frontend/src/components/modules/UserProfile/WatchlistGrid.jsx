import { Center, Flex } from "@chakra-ui/react";
import LinkedCard from "src/components/common/ui/LinkedCard/LinkedCard";

const WatchListGrid = ({ watchlist }) => {
  return (
    <Flex direction="column">
      {watchlist.length > 0 ? (
        <Flex wrap="wrap" justify="flex-start">
          {watchlist.map((item) => (
            <LinkedCard key={item.itemId} item={item} />
          ))}
        </Flex>
      ) : (
        <Center>No listings</Center>
      )}
    </Flex>
  );
};

export default WatchListGrid;
