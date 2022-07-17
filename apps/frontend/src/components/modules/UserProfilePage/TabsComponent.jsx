import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import UserCollectionsComponent from "./UserCollectionsComponent";
import UserListingsComponent from "./UserListingsComponent";
import UserOwnedComponent from "./UserOwnedComponent";
import WatchListComponent from "./WatchlistComponent";

const TabsComponent = ({ userData }) => {
  return (
    <Tabs variant="soft-rounded" colorScheme="purple">
      <TabList gap={3}>
        <Tab>Watchlist</Tab>
        <Tab>Active listings</Tab>
        <Tab>Owned NFTs</Tab>
        <Tab>My collections</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <WatchListComponent userData={userData} />
        </TabPanel>
        <TabPanel>
          <UserListingsComponent userData={userData} />
        </TabPanel>
        <TabPanel>
          <UserOwnedComponent userData={userData} />
        </TabPanel>
        <TabPanel>
          <UserCollectionsComponent userData={userData} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabsComponent;
