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
import axios from "axios"
import useSWR from "swr"
import ErrorLayout from "src/components/layouts/ErrorLayout"

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
      {items.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </Flex>
  )
}

const Marketplace = () => {
  const { data, error } = useSWR("/api/listings", (url) =>
    axios.get(url).then((res) => res.data.msg)
  )

  if (error) {
    return <ErrorLayout />
  }

  return (
    <VStack w="100%" p={10} spacing={20}>
      <Header />
      {!data ? (
        <Spinner size="xl" color="gray" />
      ) : (
        <AllListings items={data} />
      )}
    </VStack>
  )
}

export default Marketplace
