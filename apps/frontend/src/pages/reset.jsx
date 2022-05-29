import { auth, sendPasswordResetEmail } from "../../../backend/firebase";
import { Button, Flex, Heading, Input } from "@chakra-ui/react"
import Link from "next/link"
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Reset = () => { 
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (loading) 
        return;
    if (user) 
        alert("You are signed in!");;
  }, [user, loading]);

return (
    <Flex h="100vh" w="100vw" align="center" justify="center">
      <Flex direction="column" bg="gray.100" p={12} rounded="md">
        <Heading mb={6} align="center">
          Password Reset
        </Heading>
        <Input placeholder="email" variant="filled" mb={3} 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button colorScheme="teal" mb={6} onClick = {() => sendPasswordResetEmail(email)}>
          Send Reset Link to Email
        </Button>
        <Link href="/login" passHref>
          <Button variant="link" size="sm">
            Log In
          </Button>
        </Link>
        <Link href="/signup" passHref>
          <Button variant="link" size="sm">
            {// eslint-disable-next-line react/no-unescaped-entities
}           Don't have an account? Sign up with us now!
          </Button>
        </Link>
      </Flex>
    </Flex>
  )
}
export default Reset;