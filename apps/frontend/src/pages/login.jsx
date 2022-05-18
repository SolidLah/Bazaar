import { Flex, Heading, Input, Button } from "@chakra-ui/react"
import BaseLayout from "src/components/layouts/BaseLayout"

const Login = () => {
  return (
    <BaseLayout>
      <Flex h="100vh" w="100vw" align="center" justify="center">
        <Flex direction="column" bg="gray.100" p={12} rounded="md">
          <Heading mb={6} align="center">
            Log In
          </Heading>
          <Input placeholder="username" variant="filled" mb={3} />
          <Input
            placeholder="password"
            variant="filled"
            mb={6}
            type="password"
          />
          <Button colorScheme="teal" mb={6}>
            Log In
          </Button>
          <Button variant="link" size="sm">
            Sign Up
          </Button>
        </Flex>
      </Flex>
    </BaseLayout>
  )
}

export default Login
