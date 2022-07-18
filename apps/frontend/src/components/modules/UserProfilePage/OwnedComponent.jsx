import { Center, Flex, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useMemo } from "react";
import LinkedCard from "src/components/common/ui/LinkedCard/LinkedCard";
import { useStoredAddress } from "src/lib/hooks";
import useSWR from "swr";

const OwnedComponent = ({ userData }) => {
  const storedAddress = useStoredAddress(userData);
  const { data: userItems, error } = useSWR(
    storedAddress ? "/api/listings/user/" + storedAddress : null,
    (url) => axios.get(url).then((res) => res.data.msg),
    { revalidateOnFocus: false }
  );

  const owned = useMemo(
    () => (userItems ? userItems.owned : null),
    [userItems]
  );

  if (!owned && !error) {
    return <Spinner color="gray" size="xl" />;
  }

  if (error || owned.length <= 0) {
    return <Center>No NFTs owned</Center>;
  }

  return (
    <Flex wrap="wrap" justify="flex-start" gap={6}>
      {owned.map((item) => (
        <LinkedCard key={item.itemId} item={item} />
      ))}
    </Flex>
  );
};

export default OwnedComponent;
