import {
  Button,
  Heading,
  VStack,
  HStack,
  ButtonGroup,
  Flex,
  Spinner,
  Center,
} from "@chakra-ui/react"
import Link from "next/link"
import Card from "src/components/ui/Card"
import { useEffect } from "react"
import axios from "axios"
import useListingsStore from "src/stores/listingsStore"
import useSWR from "swr"

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
        return <Card key={item.id} item={item} />
      })}
    </Flex>
  )
}

const Marketplace = () => {
  const listings = useListingsStore((state) => state.listings)
  const setListings = useListingsStore((state) => state.setListings)

  const { data, error } = useSWR("/api/listings", (url) =>
    axios.get(url).then((res) => res.data.msg)
  )

  useEffect(() => {
    setListings(data)
  }, [data])

  // const newStub = useMemo(() => [...stub, ...listings], [listings])

  if (error) {
    return <Center>Error occured</Center>
  }

  return (
    <VStack w="100%" p={10} spacing={20}>
      <Header />
      {!listings ? (
        <Spinner size="xl" color="gray" />
      ) : (
        <AllListings items={listings} />
      )}
    </VStack>
  )
}

export default Marketplace
