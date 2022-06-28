import { Flex, Heading, Center } from "@chakra-ui/react";
import Card from "src/components/common/ui/Card/Card";
import UnlinkedCard from "src/components/common/ui/UnlinkedCard/UnlinkedCard";

const ListingsAndBalance = ({ items }) => {
  const userListings = items?.userListings;
  const userNFTs = items?.userNFTs;

  return (
    <Flex direction="column" gap={6}>
      <Center>
        <Heading>Listings</Heading>
      </Center>
      {userListings?.length > 0 ? (
        <Flex wrap="wrap" justify="flex-start">
          {userListings.map((listing) => (
            <Card key={listing.id} item={listing} />
          ))}
        </Flex>
      ) : (
        <Center>No listings</Center>
      )}
      <Center>
        <Heading>Owned NFTs</Heading>
      </Center>
      {userNFTs?.length > 0 ? (
        <Flex wrap="wrap" justify="flex-start">
          {userNFTs.map((nft, index) => (
            <UnlinkedCard key={index} item={nft} />
          ))}
        </Flex>
      ) : (
        <Center>No NFTs owned</Center>
      )}
    </Flex>
  );
};

export default ListingsAndBalance;
