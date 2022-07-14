import { Center, Flex, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useMemo } from "react";
import Card from "src/components/common/ui/Card/Card";
import { useStoredAddress } from "src/lib/hooks";
import useSWR from "swr";

const UserOwnedComponent = ({ userData }) => {
  const storedAddress = useStoredAddress(userData);
  const { data: userItems } = useSWR(
    storedAddress ? "/api/listings/user/" + storedAddress : null,
    (url) => axios.get(url).then((res) => res.data.msg),
    { revalidateOnFocus: false }
  );

  const owned = useMemo(
    () => (userItems ? userItems.owned : null),
    [userItems]
  );

  if (!owned) {
    return <Spinner color="gray" size="xl" />;
  }

  if (owned.length <= 0) {
    return <Center>No NFTs owned</Center>;
  }

  return (
    <Flex wrap="wrap" justify="flex-start" gap={6}>
      {owned.map((item) => (
        <Card key={item.itemId} item={item} />
      ))}
    </Flex>
  );
};

export default UserOwnedComponent;
