import { sendPasswordReset } from "src/firebase"
import { Button, Flex, Center, Heading, Input } from "@chakra-ui/react"
import Link from "next/link"
import { useState } from "react"

const ResetForm = () => {
  const [email, setEmail] = useState("")

  return (
    <Center mt={20}>
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
        <Link href="/user/signup" passHref>
          <Button variant="link" size="sm">
            Sign Up
          </Button>
        </Link>
      </Flex>
    </Center>
  )
}
export default ResetForm
