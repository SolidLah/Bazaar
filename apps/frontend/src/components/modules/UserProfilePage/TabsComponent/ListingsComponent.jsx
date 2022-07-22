import { Center, Flex, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { isEmpty } from "lodash";
import { useMemo } from "react";
import LinkedCard from "src/components/common/ui/LinkedCard/LinkedCard";
import useSWR from "swr";

const ListingsComponent = ({ data }) => {
  const { data: userItems, error } = useSWR(
    data ? "/api/listings/user/" + data.walletAddress : null,
    (url) => axios.get(url).then((res) => res.data.msg),
    { revalidateOnFocus: false }
  );

  const listed = useMemo(
    () => (userItems ? userItems.listed : null),
    [userItems]
  );

  const emptyListed = isEmpty(listed);

  if (!listed && !error) {
    return <Spinner color="gray" size="xl" />;
  }

  if (emptyListed) {
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

export default ListingsComponent;
