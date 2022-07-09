import ProtectedRouteLayout from "src/components/common/layouts/ProtectedRouteLayout";
import CreateCollectionPage from "src/components/modules/CreateCollectionPage/CreateCollectionPage";

const Collection = () => {
  return (
    <ProtectedRouteLayout>
      <CreateCollectionPage />
    </ProtectedRouteLayout>
  );
};

export default Collection;
