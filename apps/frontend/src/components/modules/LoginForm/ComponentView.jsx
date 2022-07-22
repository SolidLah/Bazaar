import { Button, Center, Flex, Heading, Input } from "@chakra-ui/react";
import Link from "next/link";
import PasswordInput from "src/components/common/ui/PasswordInput/PasswordInput";

const ComponentView = ({
  email,
  handleEmail,
  password,
  handlePassword,
  toastedCallback,
  loading,
}) => {
  return (
    <Center mt={20}>
      <Flex direction="column" bg="gray.100" p={12} rounded="md">
        <Heading mb={6} align="center">
          Log In
        </Heading>
        <Input
          type="email"
          value={email}
          onChange={handleEmail}
          placeholder="email"
          variant="filled"
          mb={3}
        />
        <PasswordInput
          value={password}
          onChange={handlePassword}
          placeholder="password"
          variant="filled"
          mb={6}
        />
        <Button
          colorScheme="purple"
          mb={6}
          onClick={toastedCallback}
          isLoading={loading}
        >
          Log In
        </Button>

        <Link href="/user/reset" passHref>
          <Button variant="link" size="sm" mb={3}>
            Forgot Password
          </Button>
        </Link>

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
