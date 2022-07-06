import { Center, Text, Grid, GridItem, Avatar, Button } from "@chakra-ui/react";
import useEthersStore from "src/stores/ethersStore";
import { db } from "src/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useSWRConfig } from "swr";
import useErrorToast from "src/lib/hooks/useErrorToast";
import useSuccessToast from "src/lib/hooks/useSuccessToast";
import { formatAddress, updateWalletAddress } from "src/lib/helpers";

const UserDetailsGrid = ({ user, fireStoredAddress }) => {
  const ethersInitialised = useEthersStore((state) => state.ethersInitialised);
  const ethersStoredAddress = useEthersStore((state) => state.address);
  const errorToast = useErrorToast("Connect wallet to account");
  const successToast = useSuccessToast("Connect wallet to account");
  const { mutate } = useSWRConfig();

  const buttonCallback = async () => {
    if (!ethersInitialised) {
      errorToast({
        description: "No connected wallet found",
      });

      return;
    }

    if (ethersStoredAddress === fireStoredAddress) {
      errorToast({
        description: "No change in wallet address",
      });

      return;
    }

    await setDoc(doc(db, "users", user.uid), {
      walletAddress: ethersStoredAddress,
    });

    successToast({
      description: "Wallet has been connected successfully",
    });

    mutate(user);
  };

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
            {fireStoredAddress ? formatAddress(fireStoredAddress) : ""}
          </Text>
          <Button colorScheme="teal" onClick={buttonCallback}>
            {fireStoredAddress ? "Change" : "Connect"}
          </Button>
        </GridItem>
      </Grid>
    </Center>
  );
};

export default UserDetailsGrid;
