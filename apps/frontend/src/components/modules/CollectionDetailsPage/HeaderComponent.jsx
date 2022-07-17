import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

const HeaderComponent = ({ address, name, symbol }) => {
  return (
    <Flex
      gap={3}
      justify="flex-start"
      bg="gray.100"
      w="100%"
      rounded="md"
      p={6}
      align="center"
    >
      <Heading>{name}</Heading>
      <Text>{symbol}</Text>
      <Spacer />
      <ButtonGroup colorScheme="teal" size="lg">
        <Link href={`/marketplace/create/nft/${address}`} passHref>
          <Button as="a">Mint</Button>
        </Link>
        <Button>List</Button>
      </ButtonGroup>
    </Flex>
  );
};

export default HeaderComponent;
