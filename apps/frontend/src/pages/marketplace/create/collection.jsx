import ProtectedRoute from "src/components/common/layouts/ProtectedRoute";
import CreateCollectionPage from "src/components/modules/CreateCollectionPage/CreateCollectionPage";

const Collection = () => {
  return (
    <ProtectedRoute>
      <CreateCollectionPage />
    </ProtectedRoute>
  );
};

export default Collection;
