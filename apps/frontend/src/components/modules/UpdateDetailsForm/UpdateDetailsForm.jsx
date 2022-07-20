import {
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useRef, useState } from "react";
import { userContext } from "src/contexts/userContext";
import { formatAddress, getWeb3, updateUserDetails } from "src/lib/helpers";
import { useErrorToast, useSuccessToast } from "src/lib/hooks";
import useEthersStore from "src/stores/ethersStore";

const UpdateDetailsForm = () => {
  const { uid, firestoreHook } = useContext(userContext);
  const { data } = firestoreHook;
  const currName = data?.name;
  const currEmail = data?.email;
  const currAddress = data ? formatAddress(data.walletAddress) : "";
  const ethersAddress = useEthersStore((state) => state.address);
  const ethersInitialised = useEthersStore((state) => state.ethersInitialised);
  const errorToast = useErrorToast("Update details");
  const successToast = useSuccessToast("Update details");

  const nameRef = useRef("");
  const emailRef = useRef("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const addressCallback = async () => {
    const web3Error = getWeb3(ethersInitialised);
    if (web3Error !== "") {
      errorToast({
        description: web3Error,
      });
      return;
    }
  };

  const updateCallback = async () => {
    const fields = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      walletAddress: ethersAddress,
    };

    setLoading(true);

    try {
      await updateUserDetails(uid, fields);
      successToast();

      nameRef.current = "";
      emailRef.current = "";

      setLoading(false);
      // router.reload();
    } catch (error) {
      console.log(error);
      errorToast({
        description: error.message,
      });
      setLoading(false);
      return;
    }
  };

  return (
    <Container mt={20} maxW="container.xl" centerContent>
      <Flex direction="column" w="md" gap={3}>
        <Heading size="lg" align="center">
          Update Details
        </Heading>
        <Flex direction="column">
          <Text>Name</Text>
          <Input ref={nameRef} placeholder={currName} bg="white" />
        </Flex>
        <Flex direction="column">
          <Text>Email</Text>
          <Input ref={emailRef} placeholder={currEmail} bg="white" />
        </Flex>
        <Text align="center">{currAddress}</Text>
        <Button onClick={addressCallback}>Use Metamask Wallet</Button>
        <Button
          onClick={updateCallback}
          colorScheme="purple"
          isLoading={loading}
        >
          Update Details
        </Button>
      </Flex>
    </Container>
  );
};

export default UpdateDetailsForm;
