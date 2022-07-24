import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import useSearchStore from "src/stores/searchStore";

const QueryNameComponent = () => {
  const nameQuery = useSearchStore((state) => state.nameQuery);
  const setNameQuery = useSearchStore((state) => state.setNameQuery);

  const handleChange = (e) => {
    e.preventDefault();
    setNameQuery(e.target.value);
  };

  return (
    <Flex>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input value={nameQuery} onChange={handleChange} />
      </FormControl>
    </Flex>
  );
};

export default QueryNameComponent;
