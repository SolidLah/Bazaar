import { Button, Heading, HStack, ButtonGroup } from "@chakra-ui/react"
import Link from "next/link"

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

export default Header
