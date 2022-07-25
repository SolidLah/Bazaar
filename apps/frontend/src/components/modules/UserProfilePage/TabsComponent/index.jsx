import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import CollectionsComponent from "./CollectionsComponent";
import FollowingComponent from "./FollowingComponent";
import ListingsComponent from "./ListingsComponent";
import OwnedComponent from "./OwnedComponent";
import WatchListComponent from "./WatchlistComponent";

const TabsComponent = ({ data, isMyProfile }) => {
  return (
    <Tabs variant="soft-rounded" colorScheme="purple">
      <TabList gap={3}>
        <Tab>Active listings</Tab>
        <Tab>Collections</Tab>
        {isMyProfile && <Tab>Owned NFTs</Tab>}
        {isMyProfile && <Tab>Watchlist</Tab>}
        {isMyProfile && <Tab>Following</Tab>}
      </TabList>
      <TabPanels>
        <TabPanel>
          <ListingsComponent data={data} />
        </TabPanel>
        <TabPanel>
          <CollectionsComponent data={data} isMyProfile={isMyProfile} />
        </TabPanel>
        {isMyProfile && (
          <TabPanel>
            <OwnedComponent data={data} />
          </TabPanel>
        )}
        {isMyProfile && (
          <TabPanel>
            <WatchListComponent data={data} />
          </TabPanel>
        )}
        {isMyProfile && (
          <TabPanel>
            <FollowingComponent data={data} />
          </TabPanel>
        )}
      </TabPanels>
    </Tabs>
  );
};

export default TabsComponent;
