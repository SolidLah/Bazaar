import { Container, Flex } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import ErrorLayout from "src/components/common/layouts/ErrorLayout";
import LoadingLayout from "src/components/common/layouts/LoadingLayout";
import { auth } from "src/lib/firebase";
import { useFirestoreUserData } from "src/lib/hooks";
import TabsComponent from "./TabsComponent";
import UserDetailsComponent from "./UserDetailsComponent";

const UserProfilePage = () => {
  const [user, authLoading, authError] = useAuthState(auth);
  const {
    userData,
    loading: firestoreLoading,
    error: firestoreError,
  } = useFirestoreUserData(user);

  if (authLoading || firestoreLoading) {
    return <LoadingLayout />;
  }

  if (authError || firestoreError) {
    return <ErrorLayout />;
  }

  return (
    <Container maxW="container.xl" mt={20}>
      <Flex gap={6} justify="flex-start">
        <UserDetailsComponent user={user} userData={userData} />
        <TabsComponent userData={userData} />
      </Flex>
    </Container>
  );
};

export default UserProfilePage;
