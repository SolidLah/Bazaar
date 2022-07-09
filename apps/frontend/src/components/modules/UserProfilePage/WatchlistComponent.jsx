import { Center, Flex } from "@chakra-ui/react";
import LoadingLayout from "src/components/common/layouts/LoadingLayout";
import LinkedCard from "src/components/common/ui/LinkedCard/LinkedCard";

const WatchListComponent = ({ watchlist }) => {
  if (!watchlist) {
    return <LoadingLayout />;
  }

  return watchlist?.length > 0 ? (
    <Flex gap={6} wrap="wrap" justify="flex-start">
      {watchlist.map((item) => (
        <LinkedCard key={item.itemId} item={item} watchlistEnabled={true} />
      ))}
    </Flex>
  ) : (
    <Center>Watchlist empty</Center>
  );
};

export default WatchListComponent;
