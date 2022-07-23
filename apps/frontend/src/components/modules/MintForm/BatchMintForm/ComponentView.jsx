import { Button, Flex, Heading, Input } from "@chakra-ui/react";

const ComponentView = ({
  handleZip,
  description,
  handleDescription,
  toastedCallback,
  loading,
  loadingMessage,
}) => {
  return (
    <Flex
      p={12}
      rounded="xl"
      direction="column"
      gap={3}
      bg="gray.100"
      w="max-content"
      mx="auto"
    >
      <Heading align="center">Mint multiple NFT</Heading>
      <Input onChange={handleZip} type="file" accept=".zip" />
      <Input
        value={description}
        onChange={handleDescription}
        placeholder="description"
        variant="filled"
      />
      <Button
        onClick={toastedCallback}
        isLoading={loading}
        loadingText={loadingMessage}
        colorScheme="purple"
      >
        Mint
      </Button>
    </Flex>
  );
};

export default ComponentView;
