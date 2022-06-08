import { Square, Flex, Box, Text, Heading } from "@chakra-ui/react"
import Image from "next/image"
import bazaar_icon_alpha from "../../../public/bazaar_icon_alpha.png"

const Card = ({ item }) => {
  return (
    <Square
      size={60}
      bg="gray.100"
      m={3}
      borderRadius="lg"
      _hover={{ shadow: "md" }}
      cursor="pointer"
    >
      <Flex
        w="100%"
        h="100%"
        direction="column"
        align="center"
        justify="flex-end"
      >
        <Image src={bazaar_icon_alpha} alt="Bazaar Icon" />
        <Box bg="gray.200" w="100%" p={3} borderBottomRadius="lg">
          <Heading size="sm">{item.name}</Heading>
          <Text>{item.description}</Text>
        </Box>
      </Flex>
    </Square>
  )
}

export default Card
