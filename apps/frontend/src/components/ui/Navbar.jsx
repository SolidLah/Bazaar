import { Heading, HStack, Button, Avatar } from "@chakra-ui/react"
import Image from "next/image"
import { useRouter } from "next/router"
import Link from "next/link"
import bazaar_icon_alpha from "../../../public/bazaar_icon_alpha.png"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, logout } from "src/firebase"

const Navbar = () => {
  const router = useRouter()
  const [user, loading, error] = useAuthState(auth)

  const logoutCallback = async () => {
    await logout()
    router.push("/login")
  }

  return (
    <HStack
      w="100%"
      justify="space-between"
      p={5}
      bgGradient="linear(to-r, #E5618D, #7667BB)"
    >
      <Link href="/" passHref>
        <HStack spacing={0} cursor="pointer">
          <Heading size="xl" color="black">
            Bazaar
          </Heading>
          <div style={{ width: "30px", height: "30px" }}>
            <Image src={bazaar_icon_alpha} alt="Bazaar Icon" />
          </div>
        </HStack>
      </Link>
      <HStack justify="space-evenly" spacing={3}>
        <Link href="/marketplace" passHref>
          <Button colorScheme="blackAlpha" variant="ghost" color="white">
            Marketplace
          </Button>
        </Link>
        <Button colorScheme="blackAlpha" variant="ghost" color="white">
          Trending
        </Button>
        <Link href="/creators" passHref>
          <Button colorScheme="blackAlpha" variant="ghost" color="white">
            Creators
          </Button>
        </Link>
        <Button colorScheme="blackAlpha" variant="ghost" color="white">
          Albums
        </Button>
        {user ? (
          <Button
            onClick={logoutCallback}
            colorScheme="blackAlpha"
            variant="ghost"
            color="white"
          >
            Logout
          </Button>
        ) : (
          <Link href="/login" passHref>
            <Button colorScheme="blackAlpha" variant="ghost" color="white">
              Login
            </Button>
          </Link>
        )}
        <Link href="/me" passHref>
          <Avatar cursor="pointer" />
        </Link>
      </HStack>
    </HStack>
  )
}

export default Navbar
