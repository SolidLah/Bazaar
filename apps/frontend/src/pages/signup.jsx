import { Button, Flex, Heading, Input } from "@chakra-ui/react"
import BaseLayout from "src/components/layouts/BaseLayout"

const Signup = () => {
  return (
    <BaseLayout>
      <Flex h="100vh" w="100vw" align="center" justify="center">
        <Flex direction="column" bg="gray.100" p={12} rounded="md">
          <Heading mb={6} align="center">
            Sign Up
          </Heading>
          <Input placeholder="username" variant="filled" mb={3} />
          <Input
            placeholder="password"
            variant="filled"
            mb={3}
            type="password"
          />
          <Input
            placeholder="confirm password"
            variant="filled"
            mb={6}
            type="password"
          />
          <Button colorScheme="teal" mb={6}>
            Sign Up
          </Button>
          <Button variant="link" size="sm">
            Log In
          </Button>
        </Flex>
      </Flex>
    </BaseLayout>
  )
}

export default Signup
