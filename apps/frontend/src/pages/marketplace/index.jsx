import {
  Button,
  Heading,
  VStack,
  HStack,
  ButtonGroup,
  Flex,
  Spinner,
} from "@chakra-ui/react"
import axios from "axios"
import Link from "next/link"
import Card from "src/components/ui/Card"
import stub from "src/stub"
import { useState, useEffect, useMemo } from "react"

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
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState([])

  useEffect(() => {
    let mounted = true

    const getListings = async () => {
      const listings = (await axios.get("http://localhost:3000/api/listings"))
        .data.msg

      setListings(listings)
      setLoading(false)
    }

    if (mounted) {
      getListings()
    }

    return () => {
      mounted = false
    }
  }, [])

  const newStub = useMemo(() => [...stub, ...listings], [listings])

  return (
    <VStack w="100%" p={10} spacing={20}>
      <Header />
      {loading ? <Spinner size="lg" /> : <AllListings items={newStub} />}
    </VStack>
  )
}

/* export async function getServerSideProps() {
  const listings = (await axios.get("http://localhost:3000/api/listings")).data
    .msg

  return { props: { listings } }
} */

export default Marketplace
