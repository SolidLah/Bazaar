import {
  Button,
  Heading,
  VStack,
  HStack,
  ButtonGroup,
  Flex,
  Spinner,
} from "@chakra-ui/react"
import Link from "next/link"
import Card from "src/components/ui/Card"
import stub from "src/stub"
import { useEffect, useMemo } from "react"
import useListingsStore from "src/stores/listingsStore"

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
  const listings = useListingsStore((state) => state.listings)
  const setListings = useListingsStore((state) => state.setListings)

  useEffect(() => {
    let mounted = true

    if (mounted) {
      console.log("called")
      setListings(listings)
    }

    return () => {
      mounted = false
    }
  }, [])

  const newStub = useMemo(() => [...stub, ...listings], [listings])

  return (
    <VStack w="100%" p={10} spacing={20}>
      <Header />
      {listings.length == 0 ? (
        <Spinner size="xl" color="gray" />
      ) : (
        <AllListings items={newStub} />
      )}
    </VStack>
  )
}

export default Marketplace
