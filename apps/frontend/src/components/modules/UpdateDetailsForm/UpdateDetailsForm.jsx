import { Container, Flex, Heading } from "@chakra-ui/react";
import { useContext } from "react";
import { userContext } from "src/contexts/userContext";
import { formatAddress } from "src/lib/helpers";
import useEthersStore from "src/stores/ethersStore";
import EmailComponent from "./EmailComponent";
import NameComponent from "./NameComponent";
import PasswordComponent from "./PasswordComponent";
import WalletComponent from "./WalletComponent";

const UpdateDetailsForm = () => {
  // firestore
  const { uid, firestoreHook } = useContext(userContext);
  const { data } = firestoreHook;
  const currName = data?.name;
  const currEmail = data?.email;
  const currAddress = data ? formatAddress(data.walletAddress) : "";

  // metamask
  const ethersAddress = useEthersStore((state) => state.address);
  const metamaskAddress = ethersAddress ? formatAddress(ethersAddress) : null;

  return (
    <Container mt={20} maxW="container.xl" centerContent>
      <Flex direction="column" gap={10} align="center">
        <Heading>Update Details</Heading>
        <NameComponent uid={uid} current={currName} />
        <EmailComponent uid={uid} current={currEmail} />
        <WalletComponent
          uid={uid}
          current={currAddress}
          metamask={metamaskAddress}
        />
        <PasswordComponent />
      </Flex>
    </Container>
  );
};

export default UpdateDetailsForm;
