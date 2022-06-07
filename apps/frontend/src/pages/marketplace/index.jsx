import { Button, Heading, VStack, HStack } from "@chakra-ui/react"
import Link from "next/link"
import Carousel from "src/components/ui/Carousel"

const Marketplace = () => {
  return (
    <VStack p={10} spacing={20}>
      <HStack w="100%" justify="space-between">
        <Heading>Marketplace</Heading>
        <HStack paddingRight={10} spacing={3}>
          <Link href="/marketplace/mint" passHref>
            <Button size="lg" colorScheme="teal">Mint</Button>
          </Link>
          <Link href="/marketplace/mint" passHref>
            <Button size="lg" colorScheme="teal">List</Button>
          </Link>
        </HStack>
      </HStack>
      <Carousel />
    </VStack>
  )
}

export default Marketplace
