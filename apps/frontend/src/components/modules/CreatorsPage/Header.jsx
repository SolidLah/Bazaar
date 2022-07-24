import { Button, ButtonGroup, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";

const Header = ({ user }) => {
  return (
    <Flex
      w="100%"
      justify="space-between"
      p={6}
      align="flex-end"
      bg="gray.100"
      rounded="xl"
    >
      <Heading>Creators</Heading>
      <ButtonGroup colorScheme="purple" size="lg">
        {!user && (
          <Link href="/user/signup/" passHref>
            <Button as="a">Sign Up</Button>
          </Link>
        )}
        <Link href="/collection/new" passHref>
          <Button as="a">New Collection</Button>
        </Link>
      </ButtonGroup>
    </Flex>
  );
};

export default Header;
