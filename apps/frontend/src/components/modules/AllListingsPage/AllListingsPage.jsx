import { Spinner, Container } from "@chakra-ui/react";
import axios from "axios";
import useSWR from "swr";
import ErrorLayout from "src/components/common/layouts/ErrorLayout";
import Header from "./Header";
import ListingsGrid from "./ListingsGrid";
import { useMemo, useState } from "react";

const AllListingsPage = () => {
  const { data: items, error } = useSWR(
    "/api/listings",
    (url) => axios.get(url).then((res) => res.data.msg),
    { revalidateOnFocus: false }
  );

  const [query, setQuery] = useState("");
  const queriedItems = useMemo(() => {
    if (!query || !items) return items;

    const capsQuery = query.toUpperCase();
    const res = items.filter((item) => {
      const capsName = item.nftData.name.toUpperCase();
      return capsName.includes(capsQuery);
    });
    return res;
  }, [query, items]);

  if (error) {
    return <ErrorLayout />;
  }

  return (
    <Container maxW="container.xl" centerContent gap={6} mt={20}>
      <Header query={query} setQuery={setQuery} />
      {!queriedItems ? (
        <Spinner size="xl" color="gray" />
      ) : (
        <ListingsGrid items={queriedItems} />
      )}
    </Container>
  );
};

export default AllListingsPage;
