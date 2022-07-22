import { Container, Flex } from "@chakra-ui/react";
import ErrorLayout from "src/components/common/layouts/ErrorLayout";
import LoadingLayout from "src/components/common/layouts/LoadingLayout";
import UserCard from "src/components/common/ui/UserCard/UserCard";
import { useAllCreators } from "src/lib/hooks";
import Header from "./Header";

const CreatorsPage = () => {
  const { data, loading, error } = useAllCreators();

  if (loading) return <LoadingLayout />;
  if (error) return <ErrorLayout />;
  if (!data) return <ErrorLayout message="No creators" />;

  return (
    <Container maxW="container.xl" mt={20}>
      <Flex gap={6} direction="column">
        <Header />
        <Flex justify="flex-start" direction="column" gap={3}>
          {data.map((creator) => (
            <UserCard key={creator.uid} user={creator} w="xl" />
          ))}
        </Flex>
      </Flex>
    </Container>
  );
};

export default CreatorsPage;
