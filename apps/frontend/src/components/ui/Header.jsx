import { Heading, HStack, Button, Avatar } from "@chakra-ui/react"
import Image from "next/image"
import Link from "next/link"
import bazaar_icon_alpha from "../../../public/bazaar_icon_alpha.png"

const Header = () => {
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
        <Button colorScheme="blackAlpha" variant="ghost" color="white">
          Marketplace
        </Button>
        <Button colorScheme="blackAlpha" variant="ghost" color="white">
          Trending
        </Button>
        <Button colorScheme="blackAlpha" variant="ghost" color="white">
          Creators
        </Button>
        <Button colorScheme="blackAlpha" variant="ghost" color="white">
          Albums
        </Button>
        <Link href="/login" passHref>
          <Button colorScheme="blackAlpha" variant="ghost" color="white">
            Login
          </Button>
        </Link>
        <Avatar />
      </HStack>
    </HStack>
  )
}

export default Header
