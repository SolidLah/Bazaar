import { Box, Container, Flex } from "@chakra-ui/react";
import ErrorLayout from "src/components/common/layouts/ErrorLayout";
import LoadingLayout from "src/components/common/layouts/LoadingLayout";
import useFirestoreUidData from "src/lib/hooks/useFirestoreUidData";
import TabsComponent from "./TabsComponent";
import DetailsComponent from "./DetailsComponent";

const UserProfilePage = ({ uid }) => {
  const { data, loading, error } = useFirestoreUidData(uid);

  if (loading) {
    return <LoadingLayout />;
  }

  if (error) {
    return <ErrorLayout />;
  }

  return (
    <Box
      h="100vw"
      bgImg={data ? `url(${data?.background})` : null}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      py={10}
    >
      <Container maxW="container.xl" bg="whiteAlpha.500" h="100%" py={10}>
        <Flex gap={6} justify="flex-start">
          <DetailsComponent data={data} />
          <TabsComponent data={data} />
        </Flex>
      </Container>
    </Box>
  );
};

export default UserProfilePage;
