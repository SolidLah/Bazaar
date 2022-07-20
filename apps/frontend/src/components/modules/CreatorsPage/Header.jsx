import { Button, ButtonGroup, Flex, Heading } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex
      w="100%"
      justify="space-between"
      p={6}
      align="flex-end"
      bg="gray.100"
      borderRadius="md"
    >
      <Heading>Creators</Heading>
      <ButtonGroup colorScheme="purple" size="lg">
        <Button>Sign up</Button>
        <Button>New collection</Button>
      </ButtonGroup>
    </Flex>
  );
};

export default Header;
