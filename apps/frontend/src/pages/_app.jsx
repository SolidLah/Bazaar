import { ChakraProvider } from "@chakra-ui/react"
import BaseLayout from "src/components/layouts/BaseLayout"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </ChakraProvider>
  )
}

export default MyApp
