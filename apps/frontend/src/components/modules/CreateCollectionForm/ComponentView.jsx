import { Button, Center, Flex, Heading, Input } from "@chakra-ui/react";

const ComponentView = ({
  name,
  handleName,
  symbol,
  handleSymbol,
  callback,
  loading,
}) => {
  return (
    <Center mt={20}>
      <Flex direction="column" bg="gray.100" p={12} rounded="md" gap={3}>
        <Heading textAlign="center">Create collection</Heading>
        <Input
          value={name}
          onChange={handleName}
          placeholder="collection name"
          variant="filled"
        />
        <Input
          value={symbol}
          onChange={handleSymbol}
          placeholder="collection symbol"
          variant="filled"
        />
        <Button onClick={callback} isLoading={loading} colorScheme="purple">
          Create collection
        </Button>
      </Flex>
    </Center>
  );
};

export default ComponentView;
