import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";

const ComponentView = ({ callback, loading, price, handlePrice, isOwner }) => {
  return (
    <Flex gap={3}>
      <InputGroup>
        <Input
          value={price}
          onChange={handlePrice}
          placeholder="price"
          variant="filled"
        />
        <InputRightAddon bg="gray.200">
          <Heading size="xs">MATIC</Heading>
        </InputRightAddon>
      </InputGroup>
      <Button
        onClick={callback}
        isLoading={loading}
        colorScheme="purple"
        px={6}
        isDisabled={!isOwner}
      >
        List
      </Button>
    </Flex>
  );
};

export default ComponentView;
