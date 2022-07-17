import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import useSearchStore from "src/stores/searchStore";

const PriceRangeComponent = () => {
  const setPriceRangeLower = useSearchStore(
    (state) => state.setPriceRangeLower
  );
  const setPriceRangeUpper = useSearchStore(
    (state) => state.setPriceRangeUpper
  );
  const priceRange = useSearchStore((state) => state.priceRange);

  const handleLower = (e) => {
    e.preventDefault();
    setPriceRangeLower(e.target.value);
  };

  const handleUpper = (e) => {
    e.preventDefault();
    setPriceRangeUpper(e.target.value);
  };

  return (
    <Flex>
      <FormControl>
        <FormLabel>Price</FormLabel>
        <Flex gap={3}>
          <Input value={priceRange.lower} onChange={handleLower} />
          <Input value={priceRange.upper} onChange={handleUpper} />
        </Flex>
      </FormControl>
    </Flex>
  );
};

export default PriceRangeComponent;
