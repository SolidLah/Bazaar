import { Flex, Heading, Input, Button, Center } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { logInWithEmailAndPassword } from "src/lib/firebase";
import useErrorToast from "src/lib/hooks/useErrorToast";

const LoginForm = () => {
  const emailRef = useRef();
  const errorToast = useErrorToast("Verify Email");
  const router = useRouter();

  const buttonCallback = async (event) => {
    event.preventDefault();
    const email = emailRef.current?.value;

    if (!email) {
      errorToast({
        description: "Missing email",
      });

      return;
    }

    try {
      await logInWithEmailAndPassword(email, password);
      await sendEmailVerification(res.user)
      if (router.query && router.query.from) {
        router.push(router.query.from);
      } else {
        router.push("/user");
      }
    } catch (error) {
      errorToast({
        description: error.message,
      });
    }
  };

  return (
    <Center mt={20}>
      <Flex direction="column" bg="gray.100" p={12} rounded="md">
        <Heading mb={6} align="center">
          User Verification
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
          Resend Email Verification
        </Button>

        <Link href="/user/login" passHref>
          <Button variant="link" size="sm">
            Login
          </Button>
        </Link>
      </Flex>
    </Center>
  );
};

export default LoginForm;
