import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import UserCollectionsComponent from "./UserCollectionsComponent";
import UserListingsComponent from "./UserListingsComponent";
import UserOwnedComponent from "./UserOwnedComponent";
import WatchListComponent from "./WatchlistComponent";

const TabsComponent = ({ watchlist, items, collections }) => {
  return (
    <Tabs variant="soft-rounded" colorScheme="purple">
      <TabList gap={3}>
        <Tab>Watchlist</Tab>
        <Tab>Current listings</Tab>
        <Tab>Owned NFTs</Tab>
        <Tab>Collections</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <WatchListComponent watchlist={watchlist} />
        </TabPanel>
        <TabPanel>
          <UserListingsComponent listed={items.listed} />
        </TabPanel>
        <TabPanel>
          <UserOwnedComponent owned={items.owned} />
        </TabPanel>
        <TabPanel>
          <UserCollectionsComponent collections={collections} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabsComponent;
