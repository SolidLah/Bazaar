import { Button, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import Link from "next/link";

const HeaderComponent = ({ address, name, symbol, isOwner }) => {
  return (
    <Flex
      gap={3}
      justify="flex-start"
      bg="gray.100"
      w="100%"
      rounded="xl"
      p={6}
      align="center"
    >
      <Heading>{name}</Heading>
      <Text>{symbol}</Text>
      <Spacer />
      {isOwner && (
        <Link href={`/collection/${address}/mint`} passHref>
          <Button colorScheme="purple" size="lg" as="a">
            Mint
          </Button>
        </Link>
      )}
    </Flex>
  );
};

export default HeaderComponent;
