import { Heading, HStack, Button, Avatar } from "@chakra-ui/react"
import Image from "next/image"
import bazaar_icon_alpha from "../../../public/bazaar_icon_alpha.png"

const Header = () => {
  return (
    <HStack
      w="100%"
      justify="space-between"
      p={5}
      bgGradient="linear(to-r, #E5618D, #7667BB)"
    >
      <HStack spacing={0}>
        <Heading size="xl" color="black">
          Bazaar
        </Heading>
        <div style={{ width: "30px", height: "30px" }}>
          <Image src={bazaar_icon_alpha} alt="Bazaar Icon" />
        </div>
      </HStack>
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
        <Button colorScheme="blackAlpha" variant="ghost" color="white">
          Login
        </Button>
        <Avatar />
      </HStack>
    </HStack>
  )
}

export default Header
