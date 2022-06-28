import { useRouter } from "next/router"
import ListingDetails from "src/components/modules/ListingDetails"

const Details = () => {
  const router = useRouter()
  const { id } = router.query

  return <ListingDetails id={id} />
}

export default Details
