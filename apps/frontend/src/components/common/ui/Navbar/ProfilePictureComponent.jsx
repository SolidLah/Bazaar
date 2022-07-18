import {
  Avatar,
  Flex,
  Button,
  Heading,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useStoredAddress } from "src/lib/hooks";
import { formatAddress } from "src/lib/helpers";
import { useContext } from "react";
import { userContext } from "src/contexts/userContext";

const ProfilePictureComponent = () => {
  const { authState, firestoreHook } = useContext(userContext);
  const [user] = authState;
  const { userData } = firestoreHook;
  const fireStoredAddress = useStoredAddress(userData);
  return (
    <Popover>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Avatar cursor="pointer" />
          </PopoverTrigger>
          <Portal>
            <PopoverContent bg="gray.200">
              <PopoverBody>
                <Flex direction="column" gap={6}>
                  {user && (
                    <Flex direction="row" gap={6} align="center">
                      <Avatar size="xl" />
                      <Flex direction="column">
                        <Heading size="md">{user.email}</Heading>
                        <Text>{user.displayName}</Text>
                        <Text>
                          {fireStoredAddress
                            ? formatAddress(fireStoredAddress)
                            : "Connect wallet"}
                        </Text>
                      </Flex>
                    </Flex>
                  )}
                  {user ? (
                    <Link href={`/user/${user.uid}`} passHref>
                      <Button as="a" colorScheme="purple" onClick={onClose}>
                        User profile
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/user/login" passHref>
                      <Button as="a" colorScheme="purple" onClick={onClose}>
                        Login
                      </Button>
                    </Link>
                  )}
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
};

export default ProfilePictureComponent;
