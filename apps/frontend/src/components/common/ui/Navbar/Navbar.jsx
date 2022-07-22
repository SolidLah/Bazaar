import { Button, Heading, HStack } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import WalletHandlerButton from "src/components/common/ui/WalletHandlerButton/WalletHandlerButton";
import { userContext } from "src/contexts/userContext";
import { auth } from "src/lib/firebase";
import { useLoginRedirect } from "src/lib/hooks";
import ProfilePictureComponent from "./ProfilePictureComponent";

const Navbar = () => {
  const { authState } = useContext(userContext);
  const [user] = authState;
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
      <Link href="/" passHref>
        <HStack spacing={0} cursor="pointer">
          <Heading size="xl" color="black">
            Bazaar
          </Heading>
          <Image
            src="/images/bazaar_icon_alpha.png"
            alt="Bazaar Icon"
            width="30px"
            height="30px"
          />
        </HStack>
      </Link>
      <HStack justify="space-evenly" spacing={3}>
        <Link href="/marketplace" passHref>
          <Button as="a" colorScheme="blackAlpha" variant="ghost" color="white">
            Marketplace
          </Button>
        </Link>
        <Link href="/creators" passHref>
          <Button as="a" colorScheme="blackAlpha" variant="ghost" color="white">
            Creators
          </Button>
        </Link>
        {user ? (
          <Button
            onClick={logoutCallback}
            colorScheme="blackAlpha"
            variant="ghost"
            color="white"
          >
            Logout
          </Button>
        ) : (
          <Button
            onClick={loginCallback}
            colorScheme="blackAlpha"
            variant="ghost"
            color="white"
          >
            Login
          </Button>
        )}
        <WalletHandlerButton />
        <ProfilePictureComponent />
      </HStack>
    </HStack>
  );
};

export default Navbar;
