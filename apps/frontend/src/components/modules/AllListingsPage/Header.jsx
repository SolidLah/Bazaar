import { Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import SearchComponent from "./SearchComponent";

const Header = () => {
  return (
    <Flex
      w="100%"
      mx={10}
      bg="gray.100"
      p={6}
      rounded="xl"
      align="flex-end"
      justify="space-between"
    >
      <Heading>Marketplace</Heading>
      <Flex gap={3}>
        <SearchComponent />
        <Link href="/collection/new" passHref>
          <Button as="a" size="lg" colorScheme="purple">
            New Collection
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Header;
