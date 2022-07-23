import { Button, Flex, Heading, Input } from "@chakra-ui/react";

const ComponentView = ({
  handleImage,
  name,
  handleName,
  description,
  handleDescription,
  toastedCallback,
  loading,
  loadingMessage,
}) => {
  return (
    <Flex
      p={12}
      rounded="md"
      direction="column"
      gap={3}
      bg="gray.100"
      w="max-content"
      mx="auto"
    >
      <Heading align="center">Mint single NFT</Heading>
      <Input onChange={handleImage} type="file" accept="image/*" />
      <Input
        value={name}
        onChange={handleName}
        placeholder="name"
        variant="filled"
      />
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
