import { Flex, Heading, Input, Button } from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { auth, logInWithEmailAndPassword } from "../functions/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/router"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, loading, error] = useAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    if (loading) {
      // loading screen
      return
    }

    if (user) {
      router.push("/me")
    }
  }, [user, loading])

  return (
    <Flex h="100vh" w="100vw" align="center" justify="center">
      <Flex direction="column" bg="gray.100" p={12} rounded="md">
        <Heading mb={6} align="center">
          Log In
        </Heading>
        <Input
          placeholder="email"
          variant="filled"
          mb={3}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          variant="filled"
          mb={6}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          colorScheme="teal"
          mb={6}
          onClick={async () => await logInWithEmailAndPassword(email, password)}
        >
          Log In
        </Button>

        <Link href="/reset" passHref>
          <Button variant="link" size="sm" mb={3}>
            Forgot Password
          </Button>
        </Link>

        <Link href="/signup" passHref>
          <Button variant="link" size="sm">
            Sign Up
          </Button>
        </Link>
      </Flex>
    </Flex>
  )
}

export default Login
