import { Box, Container, Flex } from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ErrorLayout from "src/components/common/layouts/ErrorLayout";
import LoadingLayout from "src/components/common/layouts/LoadingLayout";
import { blurImage } from "src/lib/blurImage";
import { auth } from "src/lib/firebase";
import useEthersStore from "src/stores/ethersStore";
import useSWR from "swr";
import BuyComponent from "./BuyComponent";
import DetailsCard from "./DetailsCard";
import ListComponent from "./ListComponent";

const ListingDetailsPage = ({ id }) => {
  const [user] = useAuthState(auth);
  const walletAddress = useEthersStore((state) => state.address);
  const { data: item, error } = useSWR(`/api/listings/${id}`, (url) =>
    axios.get(url).then((res) => res.data.msg)
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
            <BuyComponent item={item} user={user} />
          ) : (
            <ListComponent item={item} walletAddress={walletAddress} />
          )}
        </Flex>
      </Flex>
    </Container>
  );
};

export default ListingDetailsPage;
