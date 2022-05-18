import { ChakraProvider } from "@chakra-ui/react"
import { createWagmiClient, WagmiProvider } from "wagmi"

const client = createWagmiClient()

function MyApp({ Component, pageProps }) {
  return (
    <WagmiProvider client={client}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </WagmiProvider>
  )
}

export default MyApp
