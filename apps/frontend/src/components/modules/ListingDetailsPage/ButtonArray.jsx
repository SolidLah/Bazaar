import { Flex } from "@chakra-ui/react";
import AddToWatchListButton from "src/components/common/ui/AddToWatchlistButton/AddToWatchlistButton";
import BuyButton from "src/components/common/ui/BuyButton/BuyButton";

const ButtonArray = ({ item, user }) => {
  return (
    <Flex direction="row" w="100%" gap={3}>
      <BuyButton item={item} width="full" />
      {user && (
        <AddToWatchListButton
          item={item}
          variant="outline"
          colorScheme="yellow"
        />
      )}
    </Flex>
  );
};

export default ButtonArray;
