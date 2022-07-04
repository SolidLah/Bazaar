import { Center, Flex } from "@chakra-ui/react";
import Card from "src/components/common/ui/Card/Card";

const WatchListGrid = ({ watchlist }) => {
  return (
    <Flex direction="column">
      {watchlist.length > 0 ? (
        <Flex wrap="wrap" justify="flex-start">
          {watchlist.map((item) => (
            <Card key={item.itemId} item={item} />
          ))}
        </Flex>
      ) : (
        <Center>No listings</Center>
      )}
    </Flex>
  );
};

export default WatchListGrid;
