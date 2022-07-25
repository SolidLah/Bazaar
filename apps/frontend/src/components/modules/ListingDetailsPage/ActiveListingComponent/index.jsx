import { Flex } from "@chakra-ui/react";
import AddToWatchListButton from "src/components/common/ui/AddToWatchlistButton/AddToWatchlistButton";
import BuyButton from "./BuyButton";

const ActiveListingComponent = ({ item, user, data }) => {
  return (
    <Flex direction="row" w="100%" gap={3}>
      <BuyButton item={item} data={data} width="full" />
      {user && <AddToWatchListButton item={item} variant="ghost" />}
    </Flex>
  );
};

export default ActiveListingComponent;
