import { Square, Flex, Box, Heading, Badge } from "@chakra-ui/react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const Card = ({ item }) => {
  return (
    <Link href="/marketplace/details/" passHref>
      <Square
        as={motion.div}
        size={60}
        bg="gray.100"
        m={3}
        borderRadius={10}
        _hover={{ shadow: "outline" }}
        cursor="pointer"
        whileHover={{ y: -3, scale: 1.02 }}
      >
        <Flex
          w="100%"
          h="100%"
          direction="column"
          align="center"
          justify="flex-end"
        >
          <Box w="100%" h="100%" pos="relative">
            <Image
              src={item.image}
              alt="NFT here"
              priority="true"
              layout="fill"
              objectFit="cover"
              style={{ borderTopRightRadius: 10, borderTopLeftRadius: 10 }}
            />
          </Box>
          <Flex
            bg="gray.200"
            w="100%"
            p={3}
            borderBottomRadius={10}
            direction="row"
            justify="space-between"
          >
            <Heading size="sm">{item.name}</Heading>
            <Badge colorScheme="green" variant="subtle" fontSize={12}>
              {item.price} MATIC
            </Badge>
          </Flex>
        </Flex>
      </Square>
    </Link>
  )
}

export default Card
