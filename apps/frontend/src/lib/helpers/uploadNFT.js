import axios from "axios";

export default async function uploadNFT(image, name, description) {
  // initialise FormData object
  let data = new FormData();
  data.append("image", image);
  data.append("name", name);
  data.append("description", description);

  // POST request to API
  const res = await axios.post("/api/image", data);
  const url = res.data.msg;

  return url;
}
