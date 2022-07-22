import { Button, Center, Flex, Heading, Input } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import PasswordInput from "src/components/common/ui/PasswordInput/PasswordInput";
import { auth } from "src/lib/firebase";
import { useToastedCallback } from "src/lib/hooks";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!email || !password) throw new Error("Missing fields");

    await signInWithEmailAndPassword(auth, email, password);

    setEmail("");
    setPassword("");

    if (router.query && router.query.from) {
      router.push(router.query.from);
    } else {
      router.push(`/user/${auth.currentUser.uid}`);
    }
  };

  const { toastedCallback, loading } = useToastedCallback("Login", login);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

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

export default LoginForm;
