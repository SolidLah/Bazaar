import { ChakraProvider } from "@chakra-ui/react";
import BaseLayout from "src/components/common/layouts/BaseLayout";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
          if (retryCount >= 10) return;
        },
      }}
    >
      <ChakraProvider>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </ChakraProvider>
    </SWRConfig>
  );
}

export default MyApp;
