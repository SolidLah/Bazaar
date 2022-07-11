import { useRouter } from "next/router";
import NewMintForm from "src/components/modules/NewMintForm/NewMintForm";

const NewMint = () => {
  const router = useRouter();
  const { address } = router.query;

  return <NewMintForm address={address} />;
};

export default NewMint;
