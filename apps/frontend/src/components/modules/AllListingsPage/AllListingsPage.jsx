import { Spinner, Container } from "@chakra-ui/react";
import axios from "axios";
import useSWR from "swr";
import ErrorLayout from "src/components/common/layouts/ErrorLayout";
import Header from "./Header";
import ListingsGrid from "./ListingsGrid";
import { useState } from "react";
import useQueryByName from "./useQueryByName";
import useQueryByPrice from "./useQueryByPrice";

const AllListingsPage = () => {
  const { data: items, error } = useSWR(
    "/api/listings",
    (url) => axios.get(url).then((res) => res.data.msg),
    { revalidateOnFocus: false }
  );

  const [queryName, setQueryName] = useState("");
  const [priceRange, setPriceRange] = useState({ lower: null, upper: null });
  const queriedByName = useQueryByName(queryName, items);
  const queriedItems = useQueryByPrice(priceRange, queriedByName);

  if (error) {
    return <ErrorLayout />;
  }

  return (
    <Container maxW="container.xl" centerContent gap={6} mt={20}>
      <Header
        queryName={queryName}
        setQueryName={setQueryName}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />
      {!queriedItems ? (
        <Spinner size="xl" color="gray" />
      ) : (
        <ListingsGrid items={queriedItems} />
      )}
    </Container>
  );
};

export default AllListingsPage;
