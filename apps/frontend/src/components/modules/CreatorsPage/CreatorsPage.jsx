import { Container, Flex, Heading } from "@chakra-ui/react";
import ErrorLayout from "src/components/common/layouts/ErrorLayout";
import LoadingLayout from "src/components/common/layouts/LoadingLayout";
import { useAllCreators } from "src/lib/hooks";
import CreatorCard from "./CreatorCard";

const CreatorsPage = () => {
  const { data, loading, error } = useAllCreators();

  if (loading) return <LoadingLayout />;
  if (error) return <ErrorLayout />;
  if (!value) return <ErrorLayout message="No creators" />;

  return (
    <Container maxW="container.xl" mt={20}>
      <Flex gap={6}>
        <Heading>Creators</Heading>
        <Flex>
          {data.map((creator) => (
            <CreatorCard key={creator.uid} creator={creator} />
          ))}
        </Flex>
      </Flex>
    </Container>
  );
};

export default CreatorsPage;
