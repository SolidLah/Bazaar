import { Flex, Heading, Input, Button, Center } from "@chakra-ui/react";
import Link from "next/link";
import { useRef } from "react";
import { logInWithEmailAndPassword } from "lib/firebase";

const LoginForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const buttonCallback = async (event) => {
    event.preventDefault();

    await logInWithEmailAndPassword(
      emailRef.current?.value,
      passwordRef.current?.value
    );
  };

  return (
    <Center mt={20}>
      <Flex direction="column" bg="gray.100" p={12} rounded="md">
        <Heading mb={6} align="center">
          Log In
        </Heading>
        <Input placeholder="email" ref={emailRef} variant="filled" mb={3} />
        <Input
          placeholder="password"
          ref={passwordRef}
          variant="filled"
          mb={6}
          type="password"
        />
        <Button colorScheme="teal" mb={6} onClick={buttonCallback}>
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

export default LoginForm;
