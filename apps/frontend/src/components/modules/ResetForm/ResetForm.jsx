import { sendPasswordReset } from "src/lib/firebase";
import { Button, Flex, Center, Heading, Input } from "@chakra-ui/react";
import Link from "next/link";
import { useRef } from "react";

const ResetForm = () => {
  const emailRef = useRef("");

  const buttonCallback = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;

    await sendPasswordReset(email);
  };

  return (
    <Center mt={20}>
      <Flex direction="column" bg="gray.100" p={12} rounded="md">
        <Heading mb={6} align="center">
          Password Reset
        </Heading>
        <Input ref={emailRef} placeholder="email" variant="filled" mb={3} />
        <Button colorScheme="teal" mb={6} onClick={buttonCallback}>
          Send Reset Link to Email
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
export default ResetForm;
