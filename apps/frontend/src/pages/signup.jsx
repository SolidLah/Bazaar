import { Button, Flex, Heading, Input } from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, registerWithEmailAndPassword } from "../functions/firebase"
import { useRouter } from "next/router"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [user, loading, error] = useAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    if (loading) {
      return
    }

    if (user) {
      router.push("/me")
    }
  }, [user, loading])

  const register = async () => {
    if (!name) {
      alert("Please enter name")
      return
    }

    if (password !== confirmPassword) {
      alert("Passwords are not similar")
      return
    }

    await registerWithEmailAndPassword(name, email, password)
  }
  return (
    <Flex h="100vh" w="100vw" align="center" justify="center">
      <Flex direction="column" bg="gray.100" p={12} rounded="md">
        <Heading mb={6} align="center">
          Sign Up
        </Heading>
        <Input
          placeholder="name"
          variant="filled"
          mb={3}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          mb={3}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          placeholder="confirm password"
          variant="filled"
          mb={6}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
