import { ChakraProvider } from "@chakra-ui/react"
import BaseLayout from "src/components/layouts/BaseLayout"
import { Web3ContextProvider } from "src/contexts/Web3Context"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Web3ContextProvider>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </Web3ContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
