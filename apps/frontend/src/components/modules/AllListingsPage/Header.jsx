import { Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import Link from "next/link";

const Header = ({ query, setQuery }) => {
  const searchInputHandler = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  return (
    <Flex
      w="100%"
      mx={10}
      bg="gray.100"
      p={6}
      rounded="md"
      align="flex-end"
      justify="space-between"
    >
      <Heading>Marketplace</Heading>
      <Flex>
        <InputGroup>
          <InputLeftElement>
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          <Input
            w="xs"
            variant="flushed"
            placeholder="Search"
            value={query ?? null}
            onChange={searchInputHandler}
          />
        </InputGroup>
      </Flex>
      <Link href="/collection/new" passHref>
        <Button as="a" size="lg" colorScheme="purple">
          New Collection
        </Button>
      </Link>
    </Flex>
  );
};

export default Header;
