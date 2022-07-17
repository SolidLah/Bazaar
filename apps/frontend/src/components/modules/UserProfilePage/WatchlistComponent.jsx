import { Center, Flex, Spinner } from "@chakra-ui/react";
import LinkedCard from "src/components/common/ui/LinkedCard/LinkedCard";
import { useFetchWatchlist, useWatchlist } from "src/lib/hooks";

const WatchListComponent = ({ userData }) => {
  const watchlistArray = useWatchlist(userData);
  const { watchlist, loading } = useFetchWatchlist(watchlistArray);

  if (loading) {
    return <Spinner color="gray" size="xl" />;
  }

  if (!watchlist && !loading) {
    return <Center>Watchlist empty</Center>;
  }

  if (watchlist.length <= 0) {
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
