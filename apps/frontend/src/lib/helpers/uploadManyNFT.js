import axios from "axios";

export default async function uploadManyNFT(zip, name, description) {
  // initialise FormData object
  let data = new FormData();
  data.append("zip", zip);
  data.append("name", name);
  data.append("description", description);

  // POST request to API
  const res = await axios.post("/api/images/", data);
  const url = res.data.msg;

  return url;
}
