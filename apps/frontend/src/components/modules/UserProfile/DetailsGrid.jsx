import {
  Center,
  Text,
  Grid,
  GridItem,
  Avatar,
  Button,
  useToast,
} from "@chakra-ui/react";
import useEthersStore from "src/stores/ethersStore";
import { useCallback } from "react";
import { db } from "lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useSWRConfig } from "swr";

const DetailsGrid = ({ user, fireStoredAddress }) => {
  const ethersInitialised = useEthersStore((state) => state.ethersInitialised);
  const ethersStoredAddress = useEthersStore((state) => state.address);
  const toast = useToast();
  const { mutate } = useSWRConfig();

  const buttonCallback = useCallback(async () => {
    if (!ethersInitialised) {
      toast({
        title: "Connect wallet to account",
        description: "No connected wallet found",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    if (ethersStoredAddress === fireStoredAddress) {
      toast({
        title: "Connect wallet to account",
        description: "No change in wallet address",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    await setDoc(doc(db, "users", user.uid), {
      walletAddress: ethersStoredAddress,
    });

    toast({
      title: "Connect wallet to account",
      description: "Wallet has been connected successfully",
      status: "success",
      isClosable: true,
      position: "bottom-right",
    });

    mutate(user);
  }, [user, ethersStoredAddress, fireStoredAddress, ethersInitialised]);

  return (
    <Center flexDirection="column">
      <Avatar h="250px" w="250px" mb={10} />
      <Grid
        bg="gray.200"
        borderRadius="md"
        templateColumns="repeat(2, 1fr)"
        gap={6}
        justifyItems="left"
        alignItems="center"
        p={6}
      >
        <GridItem>
          <Text fontWeight="bold">Name</Text>
        </GridItem>
        <GridItem>{user.displayName}</GridItem>
        <GridItem>
          <Text fontWeight="bold">Email</Text>
        </GridItem>
        <GridItem>{user.email}</GridItem>
        <GridItem>
          <Text fontWeight="bold">Wallet address</Text>
        </GridItem>
        <GridItem justifySelf="center">
          <Text>
            {fireStoredAddress
              ? `${fireStoredAddress?.slice(0, 3)}...${fireStoredAddress?.slice(
                  38
                )}`
              : ""}
          </Text>
          <Button colorScheme="teal" onClick={buttonCallback}>
            {fireStoredAddress ? "Change" : "Connect"}
          </Button>
        </GridItem>
      </Grid>
    </Center>
  );
};

export default DetailsGrid;
