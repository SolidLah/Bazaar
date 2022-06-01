import { sendPasswordReset } from "../functions/firebase"
import { Button, Flex, Heading, Input } from "@chakra-ui/react"
import Link from "next/link"
import React, { useState } from "react"

const Reset = () => {
  const [email, setEmail] = useState("")

  return (
    <Flex h="100vh" w="100vw" align="center" justify="center">
      <Flex direction="column" bg="gray.100" p={12} rounded="md">
        <Heading mb={6} align="center">
          Password Reset
        </Heading>
        <Input
          placeholder="email"
          variant="filled"
          mb={3}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          colorScheme="teal"
          mb={6}
          onClick={() => sendPasswordReset(email)}
        >
          Send Reset Link to Email
        </Button>
        <Link href="/signup" passHref>
          <Button variant="link" size="sm">
            Sign Up
          </Button>
        </Link>
      </Flex>
    </Flex>
  )
}
export default Reset
