import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";

const QueryNameComponent = ({ query, setQuery }) => {
  const handleChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  return (
    <Flex>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input value={query ?? null} onChange={handleChange} />
      </FormControl>
    </Flex>
  );
};

export default QueryNameComponent;
