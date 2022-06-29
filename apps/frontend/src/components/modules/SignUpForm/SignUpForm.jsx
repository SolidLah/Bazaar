import { Button, Center, Flex, Heading, Input } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword } from "src/lib/firebase";
import { useRouter } from "next/router";
import LoadingLayout from "src/components/common/layouts/LoadingLayout";
import useErrorToast from "src/lib/hooks/useErrorToast";

const SignupForm = () => {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const errorToast = useErrorToast("Sign up");

  useEffect(() => {
    if (user) {
      router.push("/user");
    }
  }, [user]);

  const register = async () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (!name || !email || !password || !confirmPassword) {
      errorToast({
        description: "Missing fields",
      });

      return;
    }

    if (password !== confirmPassword) {
      errorToast({
        description: "Passwords do not match",
      });

      return;
    }

    try {
      await registerWithEmailAndPassword(name, email, password);
    } catch (error) {
      errorToast({
        description: error.message,
      });
    }
  };

  if (loading) {
    return <LoadingLayout />;
  }

  return (
    <Center mt={20}>
      <Flex direction="column" bg="gray.100" p={12} rounded="md">
        <Heading mb={6} align="center">
          Sign Up
        </Heading>
        <Input ref={nameRef} placeholder="name" variant="filled" mb={3} />
        <Input ref={emailRef} placeholder="email" variant="filled" mb={3} />
        <Input
          ref={passwordRef}
          placeholder="password"
          variant="filled"
          mb={3}
          type="password"
        />
        <Input
          ref={confirmPasswordRef}
          placeholder="confirm password"
          variant="filled"
          mb={6}
          type="password"
        />
        <Button colorScheme="teal" mb={6} onClick={register}>
          Sign Up
        </Button>
        <Link href="/user" passHref>
          <Button variant="link" size="sm">
            Log In
          </Button>
        </Link>
      </Flex>
    </Center>
  );
};

export default SignupForm;
