import { Button, Heading, VStack, HStack, ButtonGroup } from "@chakra-ui/react"
import Link from "next/link"
import Carousel from "src/components/ui/Carousel"
import stub from "../../stub"

const Header = () => {
  return (
    <HStack w="100%" justify="space-between">
      <Heading>Marketplace</Heading>
      <ButtonGroup size="lg" colorScheme="teal" pr={10} gap={3}>
        <Link href="/marketplace/mint" passHref>
          <Button>Mint</Button>
        </Link>
        <Link href="/marketplace/mint" passHref>
          <Button>List</Button>
        </Link>
      </ButtonGroup>
    </HStack>
  )
}

const Marketplace = () => {
  return (
    <VStack w="100%" p={10} spacing={20}>
      <Header />
      <Carousel items={stub} />
    </VStack>
  )
}

export default Marketplace
