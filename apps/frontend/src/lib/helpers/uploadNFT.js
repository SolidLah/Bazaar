import axios from "axios";

export default async function uploadNFT(image, name, description) {
  // initialise FormData object
  let imageData = new FormData();
  imageData.append("image", image);
  imageData.append("name", name);
  imageData.append("description", description);

  // POST request to API
  const imageUploadRes = await axios.post("/api/image", imageData);
  const nftURI = imageUploadRes.data.msg;

  return nftURI;
}
