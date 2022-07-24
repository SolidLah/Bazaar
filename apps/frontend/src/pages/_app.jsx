import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import BaseLayout from "src/components/common/layouts/BaseLayout";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Bazaar</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
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
    </>
  );
}

export default MyApp;
