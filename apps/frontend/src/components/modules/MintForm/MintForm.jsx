import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import BatchMintForm from "./BatchMintForm";
import SingleMintForm from "./SingleMintForm";

const MintForm = ({ address }) => {
  return (
    <Container maxW="container.xl" mt={20}>
      <Tabs variant="soft-rounded" colorScheme="purple" align="center">
        <TabList gap={3}>
          <Tab>Single mint</Tab>
          <Tab>Batch mint</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SingleMintForm address={address} />
          </TabPanel>
          <TabPanel>
            <BatchMintForm address={address} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default MintForm;
