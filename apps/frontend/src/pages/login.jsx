import { Flex, Heading, Input, Button } from "@chakra-ui/react"
import Link from "next/link"

const Login = () => {
  return (
    <Flex h="100vh" w="100vw" align="center" justify="center">
      <Flex direction="column" bg="gray.100" p={12} rounded="md">
        <Heading mb={6} align="center">
          Log In
        </Heading>
        <Input placeholder="email" variant="filled" mb={3} />
        <Input placeholder="password" variant="filled" mb={6} type="password" />
        <Button colorScheme="teal" mb={6}>
          Log In
        </Button>
        <Link href="/signup" passHref>
          <Button variant="link" size="sm" href="/signup">
            Sign Up
          </Button>
        </Link>
      </Flex>
    </Flex>
  )
}

export default Login
