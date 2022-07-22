import { Button, Center, Flex, Heading, Input } from "@chakra-ui/react";
import { sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { auth } from "src/lib/firebase";
import { useToastedCallback } from "src/lib/hooks";

const ResetForm = () => {
  const [email, setEmail] = useState("");

  const reset = async () => {
    if (!email) throw new Error("Missing field");

    await sendPasswordResetEmail(auth, email);

    setEmail("");
  };

  const { toastedCallback, loading } = useToastedCallback(
    "Reset password",
    reset
  );

  const handleEmail = (e) => setEmail(e.target.value);

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
export default ResetForm;
