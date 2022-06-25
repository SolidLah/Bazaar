import {
  Flex,
  Heading,
  Input,
  Button,
  Center,
  Spinner,
  Text,
} from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { auth, logInWithEmailAndPassword } from "src/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/router"

const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [user, loading, error] = useAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/user/me")
    }
  }, [user])

  if (loading) {
    return (
      <Center p={10}>
        <Spinner size="xl" />
      </Center>
    )
  }

  const buttonCallback = async (event) => {
    event.preventDefault()

    await logInWithEmailAndPassword(
      emailRef.current?.value,
      passwordRef.current?.value
    )

    emailRef.current = null
    passwordRef.current = null
  }

  return (
    <Center mt={20}>
      <Flex direction="column" bg="gray.100" p={12} rounded="md">
        <Heading mb={6} align="center">
          Log In
        </Heading>
        <Input placeholder="email" ref={emailRef} variant="filled" mb={3} />
        <Input
          placeholder="password"
          ref={passwordRef}
          variant="filled"
          mb={6}
          type="password"
        />
        <Button colorScheme="teal" mb={6} onClick={buttonCallback}>
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
  )
}

export default Login
