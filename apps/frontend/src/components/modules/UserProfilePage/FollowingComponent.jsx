import { Center, Flex } from "@chakra-ui/react";
import ErrorLayout from "src/components/common/layouts/ErrorLayout";
import LoadingLayout from "src/components/common/layouts/LoadingLayout";
import UserCard from "src/components/common/ui/UserCard/UserCard";
import { useFetchFollowing } from "src/lib/hooks";

const FollowingComponent = ({ data }) => {
  const followingArray = data?.following;
  const { data: following, loading, error } = useFetchFollowing(followingArray);

  if (loading) return <LoadingLayout />;
  if (error) return <ErrorLayout />;

  if (!following || following.length < 1) {
    return <Center>Not following</Center>;
  }

  return (
    <Flex direction="column" justify="flex-start" gap={6}>
      {following.map((user) => (
        <UserCard key={user.uid} user={user} />
      ))}
    </Flex>
  );
};

export default FollowingComponent;
