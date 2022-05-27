import { Button, Flex, Heading, Input } from "@chakra-ui/react"
import Link from "next/link"
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) 
      return;
    if (user) history.replace("/marketplace");
  }, [user, loading, history]);
  return (
    <Flex h="100vh" w="100vw" align="center" justify="center">
      <Flex direction="column" bg="gray.100" p={12} rounded="md">
        <Heading mb={6} align="center">
          Sign Up
        </Heading>
        <Input placeholder="name" variant="filled" mb={3} 
          value={name}
          onChange={(e) => setName(e.target.value)}/>
        <Input placeholder="email" variant="filled" mb={3} 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input placeholder="password" variant="filled" mb={3} type="password" />
        <Input
          placeholder="confirm password"
          variant="filled"
          mb={6}
          type="password"
        />
        <Button colorScheme="teal" mb={6} onClick={register}>
          Sign Up
        </Button>
        <Link href="/login" passHref>
          <Button variant="link" size="sm">
            Log In
          </Button>
        </Link>
      </Flex>
    </Flex>
  )
}

export default Signup

