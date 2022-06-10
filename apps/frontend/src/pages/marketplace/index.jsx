import { Button, Heading, VStack, HStack, ButtonGroup, Flex } from "@chakra-ui/react"
import Link from "next/link"
import Card from "src/components/ui/Card"
import stub from "src/stub"

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

const AllListings = ({ items }) => {
  return (
    <Flex w="100%" h="100%" wrap="wrap" justify="flex-start">
      {items.map((item) => {
        return <Card key={item.name} item={item} />
      })}
    </Flex>
  )
}

const Marketplace = () => {
  return (
    <VStack w="100%" p={10} spacing={20}>
      <Header />
      <AllListings items={stub} />
    </VStack>
  )
}

export default Marketplace
