import { Center, Flex, Spinner } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import LinkedCard from "src/components/common/ui/LinkedCard/LinkedCard";
import { useFetchWatchlist } from "src/lib/hooks";

const WatchListComponent = ({ data }) => {
  const watchlistArray = data?.watchlist;
  const { watchlist, loading } = useFetchWatchlist(watchlistArray);

  if (loading) {
    return <Spinner color="gray" size="xl" />;
  }

  if (isEmpty(watchlist)) {
    return <Center>Watchlist empty</Center>;
  }

  return (
    <Flex wrap="wrap" justify="flex-start" gap={6}>
      {watchlist.map((item) => {
        if (item)
          return (
            <LinkedCard key={item.itemId} item={item} watchlistEnabled={true} />
          );
      })}
    </Flex>
  );
};

export default WatchListComponent;
