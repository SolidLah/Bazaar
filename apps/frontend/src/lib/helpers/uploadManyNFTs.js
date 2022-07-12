import axios from "axios";

export default async function uploadManyNFTs(zip, description) {
  // initialise FormData object
  let data = new FormData();
  data.append("zip", zip);
  data.append("description", description);

  // POST request to API
  const res = await axios.post("/api/images/", data);
  const urls = res.data.msg;

  return urls;
}
