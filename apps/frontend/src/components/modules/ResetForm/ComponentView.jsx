import { Button, Center, Flex, Heading, Input } from "@chakra-ui/react";
import Link from "next/link";

const ComponentView = ({ email, handleEmail, toastedCallback, loading }) => {
  return (
    <Center mt={20}>
      <Flex direction="column" bg="gray.100" p={12} rounded="md">
        <Heading mb={6} align="center">
          Password Reset
        </Heading>
        <Input
          type="email"
          value={email}
          onChange={handleEmail}
          placeholder="email"
          variant="filled"
          mb={3}
        />
        <Button
          colorScheme="purple"
          mb={6}
          onClick={toastedCallback}
          isLoading={loading}
        >
          Reset
        </Button>
        <Link href="/user/signup" passHref>
          <Button variant="link" size="sm">
            Sign Up
          </Button>
        </Link>
      </Flex>
    </Center>
  );
};
export default ComponentView;
