import {
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import PriceRangeComponent from "./PriceRangeComponent";
import QueryNameComponent from "./QueryNameComponent";

const SearchComponent = () => {
  return (
    <Popover closeOnBlur={false} placement="left-start">
      <PopoverTrigger>
        <Button size="lg" colorScheme="purple">
          Search
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <Flex direction="column" gap={3}>
            <QueryNameComponent />
            <PriceRangeComponent />
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default SearchComponent;
