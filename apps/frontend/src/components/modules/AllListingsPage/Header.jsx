import { Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";

const Header = () => {
  return (
    <Flex w="100%" justify="space-between" px={10}>
      <Heading>Marketplace</Heading>
      <Link href="/collection/new" passHref>
        <Button as="a" size="lg" colorScheme="purple">
          New Collection
        </Button>
      </Link>
    </Flex>
  );
};

export default Header;
