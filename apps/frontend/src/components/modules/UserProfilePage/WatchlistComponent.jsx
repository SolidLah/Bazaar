import { Center, Flex } from "@chakra-ui/react";
import LinkedCard from "src/components/common/ui/LinkedCard/LinkedCard";

const WatchListComponent = ({ watchlist }) => {
  if (!watchlist || watchlist?.length <= 0) {
    return <Center>Watchlist empty</Center>;
  }

  return (
    <Flex wrap="wrap" justify="flex-start" gap={6}>
      {watchlist.map((item) => (
        <LinkedCard key={item.itemId} item={item} watchlistEnabled={true} />
      ))}
    </Flex>
  );
};

export default WatchListComponent;
