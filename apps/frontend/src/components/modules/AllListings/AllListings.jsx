import { VStack, Spinner } from "@chakra-ui/react";
import axios from "axios";
import useSWR from "swr";
import ErrorLayout from "src/components/common/layouts/ErrorLayout";
import Header from "./Header";
import ListingsGrid from "./ListingsGrid";

const AllListings = () => {
  const { data, error } = useSWR(
    "/api/listings",
    (url) => axios.get(url).then((res) => res.data.msg),
    { revalidateOnFocus: false }
  );

  if (error) {
    return <ErrorLayout />;
  }

  return (
    <VStack w="100%" p={10} spacing={20}>
      <Header />
      {!data ? (
        <Spinner size="xl" color="gray" />
      ) : (
        <ListingsGrid items={data} />
      )}
    </VStack>
  );
};

export default AllListings;
