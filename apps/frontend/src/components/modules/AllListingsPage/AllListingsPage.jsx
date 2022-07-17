import { Spinner, Container } from "@chakra-ui/react";
import axios from "axios";
import useSWR from "swr";
import ErrorLayout from "src/components/common/layouts/ErrorLayout";
import Header from "./Header";
import ListingsGrid from "./ListingsGrid";

const AllListingsPage = () => {
  const { data, error } = useSWR(
    "/api/listings",
    (url) => axios.get(url).then((res) => res.data.msg),
    { revalidateOnFocus: false }
  );

  if (error) {
    return <ErrorLayout />;
  }

  return (
    <Container maxW="container.xl" centerContent gap={6} mt={20}>
      <Header />
      {!data ? (
        <Spinner size="xl" color="gray" />
      ) : (
        <ListingsGrid items={data} />
      )}
    </Container>
  );
};

export default AllListingsPage;
