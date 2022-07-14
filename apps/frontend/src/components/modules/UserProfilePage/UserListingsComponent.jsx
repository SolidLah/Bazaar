import { Center, Flex, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useMemo } from "react";
import LinkedCard from "src/components/common/ui/LinkedCard/LinkedCard";
import { useStoredAddress } from "src/lib/hooks";
import useSWR from "swr";

const UserListingsComponent = ({ userData }) => {
  const storedAddress = useStoredAddress(userData);
  const { data: userItems } = useSWR(
    storedAddress ? "/api/listings/user/" + storedAddress : null,
    (url) => axios.get(url).then((res) => res.data.msg),
    { revalidateOnFocus: false }
  );

  const listed = useMemo(
    () => (userItems ? userItems.listed : null),
    [userItems]
  );

  if (!listed) {
    return <Spinner color="gray" size="xl" />;
  }

  if (listed.length <= 0) {
    return <Center>No listings</Center>;
  }

  return (
    <Flex wrap="wrap" justify="flex-start" gap={6}>
      {listed.map((item) => (
        <LinkedCard key={item.itemId} item={item} watchlistEnabled={false} />
      ))}
    </Flex>
  );
};

export default UserListingsComponent;
