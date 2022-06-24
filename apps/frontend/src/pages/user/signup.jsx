import {
  Button,
  Center,
  Flex,
  Heading,
  Input,
  useToast,
  Spinner,
  Text,
} from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, registerWithEmailAndPassword } from "src/firebase"
import { useRouter } from "next/router"

const Signup = () => {
  const emailRef = useRef()
  const nameRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const [user, loading, error] = useAuthState(auth)
  const router = useRouter()
  const toast = useToast()

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

  if (error) {
    return (
      <Center p={10}>
        <Text>Error has occurred...</Text>
      </Center>
    )
  }

  const register = async () => {
    const name = nameRef.current?.value
    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    const confirmPassword = confirmPasswordRef.current?.value

    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Sign Up",
        description: "Missing fields",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      })
      return
    }

    if (password !== confirmPassword) {
      toast({
        title: "Sign Up",
        description: "Passwords do not match",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      })
      return
    }

    await registerWithEmailAndPassword(name, email, password)
  }
  return (
    <Center mt={20}>
      <Flex direction="column" bg="gray.100" p={12} rounded="md">
        <Heading mb={6} align="center">
          Sign Up
        </Heading>
        <Input ref={nameRef} placeholder="name" variant="filled" mb={3} />
        <Input ref={emailRef} placeholder="email" variant="filled" mb={3} />
        <Input
          ref={passwordRef}
          placeholder="password"
          variant="filled"
          mb={3}
          type="password"
        />
        <Input
          ref={confirmPasswordRef}
          placeholder="confirm password"
          variant="filled"
          mb={6}
          type="password"
        />
        <Button colorScheme="teal" mb={6} onClick={register}>
          Sign Up
        </Button>
        <Link href="/user/login" passHref>
          <Button variant="link" size="sm">
            Log In
          </Button>
        </Link>
      </Flex>
    </Center>
  )
}

export default Signup