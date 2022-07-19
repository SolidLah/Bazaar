import { Center, Flex } from "@chakra-ui/react";
import ErrorLayout from "src/components/common/layouts/ErrorLayout";
import LoadingLayout from "src/components/common/layouts/LoadingLayout";
import { useFetchFollowing, useFollowing } from "src/lib/hooks";
import FollowingCard from "./FollowingCard";

const FollowingComponent = ({ userData }) => {
  const followingArray = useFollowing(userData);
  const { data, loading, error } = useFetchFollowing(followingArray);

  if (loading) return <LoadingLayout />;
  if (error) return <ErrorLayout />;

  if (!data || data.length < 1) {
    return <Center>Not following</Center>;
  }

  return (
    <Flex direction="column" justify="flex-start" gap={6}>
      {data.map((user) => (
        <FollowingCard key={user.uid} user={user} />
      ))}
    </Flex>
  );
};

export default FollowingComponent;
