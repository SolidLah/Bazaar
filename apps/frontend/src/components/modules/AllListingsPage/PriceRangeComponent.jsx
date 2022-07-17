import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";

const PriceRangeComponent = ({ range, setRange }) => {
  const handleLower = (e) => {
    e.preventDefault();
    setRange({ ...range, lower: e.target.value });
  };

  const handleUpper = (e) => {
    e.preventDefault();
    setRange({ ...range, upper: e.target.value });
  };

  return (
    <Flex>
      <FormControl>
        <FormLabel>Price</FormLabel>
        <Flex gap={3}>
          <Input value={range?.lower ?? null} onChange={handleLower} />
          <Input value={range?.upper ?? null} onChange={handleUpper} />
        </Flex>
      </FormControl>
    </Flex>
  );
};

export default PriceRangeComponent;
