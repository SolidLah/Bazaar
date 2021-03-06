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
import { formatAddress } from "src/lib/helpers";

const ProfilePictureComponent = ({ user, data }) => {
  return (
    <Popover>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Avatar cursor="pointer" src={data?.avatar} />
          </PopoverTrigger>
          <Portal>
            <PopoverContent bg="gray.200" w="md">
              <PopoverBody>
                <PopupContent user={user} data={data} onClose={onClose} />
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
};

const PopupContent = ({ user, data, onClose }) => {
  return (
    <Flex direction="column" gap={6}>
      {user && (
        <Flex direction="row" gap={6} align="center">
          <Avatar size="xl" src={data?.avatar} />
          <Flex direction="column">
            <Heading size="md" noOfLines={1}>
              {data?.email}
            </Heading>
            <Text>{data?.name}</Text>
            <Text>
              {data?.walletAddress ? formatAddress(data?.walletAddress) : ""}
            </Text>
          </Flex>
        </Flex>
      )}
      {user ? (
        <Link href={`/user/${user.uid}`} passHref>
          <Button as="a" colorScheme="purple" onClick={onClose}>
            User Profile
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
  );
};

export default ProfilePictureComponent;
