import { Container, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import ErrorLayout from "src/components/common/layouts/ErrorLayout";
import useSearchStore from "src/stores/searchStore";
import useSWR from "swr";
import Header from "./Header";
import ListingsGrid from "./ListingsGrid";
import useQueriedItems from "./useQueriedItems";

const AllListingsPage = () => {
  const { data: items, error } = useSWR(
    "/api/listings",
    (url) => axios.get(url).then((res) => res.data.msg),
    { revalidateOnFocus: false }
  );

  const setItems = useSearchStore((state) => state.setItems);

  useEffect(() => {
    setItems(items);
  }, [items]);

  const queriedItems = useQueriedItems();

  if (error) {
    return <ErrorLayout />;
  }

  return (
    <Container maxW="container.xl" centerContent gap={6} mt={20}>
      <Header />
      {!queriedItems ? (
        <Spinner size="xl" color="gray" />
      ) : (
        <ListingsGrid items={queriedItems} />
      )}
    </Container>
  );
};

export default AllListingsPage;
