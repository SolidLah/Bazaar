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
import { useFirestoreUserData, useStoredAddress } from "src/lib/hooks";
import { formatAddress } from "src/lib/helpers";

const ProfilePictureComponent = ({ user }) => {
  const { userData } = useFirestoreUserData(user);
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
                  <Link href="/user" passHref>
                    <Button as="a" colorScheme="teal" onClick={onClose}>
                      {user ? "User profile" : "Login"}
                    </Button>
                  </Link>
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
