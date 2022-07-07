import { Button, Heading, HStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import WalletHandlerButton from "src/components/common/ui/WalletHandlerButton/WalletHandlerButton";
import { logout } from "src/lib/firebase";
import ProfilePictureComponent from "./ProfilePictureComponent";

const NavbarElement = ({ user }) => {
  const router = useRouter();

  const logoutCallback = async () => {
    await logout();
    router.push("/user/login");
  };

  return (
    <HStack
      w="100%"
      justify="space-between"
      p={5}
      bgGradient="linear(to-r, #E5618D, #7667BB)"
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
        <Button as="a" colorScheme="blackAlpha" variant="ghost" color="white">
          Trending
        </Button>
        <Link href="/creators" passHref>
          <Button as="a" colorScheme="blackAlpha" variant="ghost" color="white">
            Creators
          </Button>
        </Link>
        <Button as="a" colorScheme="blackAlpha" variant="ghost" color="white">
          Albums
        </Button>
        {user ? (
          <Button
            as="a"
            onClick={logoutCallback}
            colorScheme="blackAlpha"
            variant="ghost"
            color="white"
          >
            Logout
          </Button>
        ) : (
          <Link href="/user/login" passHref>
            <Button
              as="a"
              colorScheme="blackAlpha"
              variant="ghost"
              color="white"
            >
              Login
            </Button>
          </Link>
        )}
        <WalletHandlerButton />
        <ProfilePictureComponent user={user} />
      </HStack>
    </HStack>
  );
};

export default NavbarElement;
