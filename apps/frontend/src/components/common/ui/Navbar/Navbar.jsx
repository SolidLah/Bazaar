import { HStack } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import WalletHandlerButton from "src/components/common/ui/WalletHandlerButton/WalletHandlerButton";
import { userContext } from "src/contexts/userContext";
import { auth } from "src/lib/firebase";
import { useLoginRedirect } from "src/lib/hooks";
import AuthButton from "./AuthButton";
import CreatorsButton from "./CreatorsButton";
import LogoComponent from "./LogoComponent";
import MarketplaceButton from "./MarketplaceButton";
import ProfilePictureComponent from "./ProfilePictureComponent";

const Navbar = () => {
  const { user, data } = useContext(userContext);

  const loginCallback = useLoginRedirect();

  const logoutCallback = async () => {
    await signOut(auth);
  };

  return (
    <HStack
      w="100%"
      justify="space-between"
      p={5}
      bgGradient="linear(to-r, #E5618D, #7667BB)"
      position="sticky"
      top="0"
      zIndex="10"
    >
      <LogoComponent />
      <HStack justify="space-evenly" spacing={3}>
        <MarketplaceButton />
        <CreatorsButton />
        <AuthButton
          user={user}
          loginCallback={loginCallback}
          logoutCallback={logoutCallback}
        />
        <WalletHandlerButton />
        <ProfilePictureComponent user={user} data={data} />
      </HStack>
    </HStack>
  );
};

export default Navbar;
