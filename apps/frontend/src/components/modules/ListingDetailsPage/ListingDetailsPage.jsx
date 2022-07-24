import { Box, Container, Flex } from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import { useContext, useMemo } from "react";
import ErrorLayout from "src/components/common/layouts/ErrorLayout";
import LoadingLayout from "src/components/common/layouts/LoadingLayout";
import { userContext } from "src/contexts/userContext";
import { blurImage } from "src/lib/blurImage";
import useEthersStore from "src/stores/ethersStore";
import useSWR from "swr";
import ActiveListingComponent from "./ActiveListingComponent";
import DetailsCard from "./DetailsCard";
import InactiveListingComponent from "./InactiveListingComponent";

const ListingDetailsPage = ({ id }) => {
  const { user } = useContext(userContext);
  const walletAddress = useEthersStore((state) => state.address);

  const { data: item, error } = useSWR(
    id ? `/api/listings/${id}` : null,
    (url) => axios.get(url).then((res) => res.data.msg)
  );

  const active = useMemo(() => (item ? item.active : null), [item]);

  if (!item && !error) {
    return <LoadingLayout />;
  }

  if (error) {
    return <ErrorLayout />;
  }

  return (
    <Container centerContent maxW="container.xl" mt={20}>
      <Flex w="100%" justify="space-around" align="flex-start">
        <Box w="xl" h="xl" pos="relative">
          <Image
            src={item.nftData.image}
            alt="NFT here"
            layout="fill"
            objectFit="contain"
            placeholder="blur"
            blurDataURL={blurImage}
          />
        </Box>
        <Flex w="md" h="100%" direction="column" justify="flex-start" gap={6}>
          <DetailsCard item={item} active={active} />
          {active ? (
            <ActiveListingComponent item={item} user={user} />
          ) : (
            <InactiveListingComponent
              item={item}
              walletAddress={hydratedWalletAddress}
            />
          )}
        </Flex>
      </Flex>
    </Container>
  );
};

export default ListingDetailsPage;
