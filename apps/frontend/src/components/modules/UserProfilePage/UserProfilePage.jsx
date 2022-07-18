import { Container, Flex } from "@chakra-ui/react";
import ErrorLayout from "src/components/common/layouts/ErrorLayout";
import LoadingLayout from "src/components/common/layouts/LoadingLayout";
import useFirestoreUidData from "src/lib/hooks/useFirestoreUidData";
import TabsComponent from "./TabsComponent";
import UserDetailsComponent from "./UserDetailsComponent";

const UserProfilePage = ({ uid }) => {
  const { data, loading, error } = useFirestoreUidData(uid);

  if (loading) {
    return <LoadingLayout />;
  }

  if (error) {
    return <ErrorLayout />;
  }

  return (
    <Container maxW="container.xl" mt={20}>
      <Flex gap={6} justify="flex-start">
        <UserDetailsComponent uid={uid} userData={data} />
        <TabsComponent userData={data} />
      </Flex>
    </Container>
  );
};

export default UserProfilePage;
