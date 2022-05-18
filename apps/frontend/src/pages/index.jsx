import { Button, GridItem, SimpleGrid, Text } from "@chakra-ui/react"
import BaseLayout from "src/components/layouts/BaseLayout"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { useState, useEffect } from "react"

const Home = () => {
  const { data: account, isLoading: accountLoading } = useAccount()
  const { connect, isConnected } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <BaseLayout>
      <SimpleGrid columns={2} columnGap={3} rowGap={3}>
        <GridItem colSpan={2}>
          <Text>Connect Account</Text>
        </GridItem>
        <GridItem colSpan={1}>
          <Button
            onClick={() => {
              connect(new MetaMaskConnector())
            }}
          >
            Connect
          </Button>
        </GridItem>
        <GridItem colSpan={1}>
          <Button
            onClick={() => {
              disconnect()
            }}
          >
            Disconnect
          </Button>
        </GridItem>
        <GridItem colSpan={2}></GridItem>
        <Text>
          Account:{" "}
          {!accountLoading && isConnected ? account.address : "not connected"}
        </Text>
      </SimpleGrid>
    </BaseLayout>
  )
}

export default Home
