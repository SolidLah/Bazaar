import { Center, Flex, Heading } from "@chakra-ui/react";
import LinkedCard from "src/components/common/ui/LinkedCard/LinkedCard";

const WatchListGrid = ({ watchlist }) => {
  return (
    <Flex direction="column" gap={6}>
      <Center>
        <Heading>Watchlist</Heading>
      </Center>
      {watchlist.length > 0 ? (
        <Flex wrap="wrap" justify="flex-start">
          {watchlist.map((item) => (
            <LinkedCard key={item.itemId} item={item} watchlistEnabled={true} />
          ))}
        </Flex>
      ) : (
        <Center>Watchlist empty</Center>
      )}
    </Flex>
  );
};

export default WatchListGrid;
