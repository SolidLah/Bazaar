import { Flex, Heading, OrderedList, ListItem, Link } from "@chakra-ui/react"
import ConnectWalletButton from "src/components/common/ui/ConnectWalletButton"
import NextLink from "next/link"

const Home = () => {
  return (
    <Flex h="100%" direction="column">
      <Flex p={10} direction="column">
        <Heading mb={3}>How to use</Heading>
        <OrderedList mb={10}>
          <ListItem>
            Install{" "}
            <Link href="https://metamask.io" isExternal color="teal">
              metamask extension
            </Link>{" "}
            in your browser
          </ListItem>
          <ListItem>
            Add{" "}
            <Link href="https://mumbai.polygonscan.com" isExternal color="teal">
              polygon mumbai testnet
            </Link>{" "}
            to metamask
          </ListItem>
          <ListItem>
            Get MATIC from a{" "}
            <Link href="https://mumbaifaucet.com" isExternal color="teal">
              faucet
            </Link>
          </ListItem>
          <ListItem>Connect your wallet to the site</ListItem>
          <ListItem>
            Go to the{" "}
            <NextLink href="/marketplace" passHref>
              <Link color="teal">marketplace</Link>
            </NextLink>{" "}
            and mint your NFT!
          </ListItem>
        </OrderedList>
      </Flex>
      <Flex p={10} justify="center">
        <ConnectWalletButton />
      </Flex>
    </Flex>
  )
}

export default Home
