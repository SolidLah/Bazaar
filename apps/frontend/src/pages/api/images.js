import { IncomingForm } from "formidable";
import Moralis from "moralis/node";
import fs from "fs";
import JSZip from "jszip";

export const config = {
  api: {
    bodyParser: false,
  },
};

const asyncParse = (req) =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await Moralis.start({
        serverUrl: process.env.MORALIS_SERVER_URL,
        appId: process.env.MORALIS_APP_ID,
        masterKey: process.env.MORALIS_MASTER_KEY,
      });

      const formidableRes = await asyncParse(req);
      const description = formidableRes.fields.description;

      let images = [];

      const zipFile = formidableRes.files.zip;
      const data = fs.readFileSync(zipFile.filepath);
      const zipRes = await JSZip.loadAsync(data);
      const zipKeys = Object.keys(zipRes.files);

      await Promise.all(
        zipKeys.map(async (key) => {
          const item = zipRes.files[key];

          if (!item.dir && !item.name.includes("._")) {
            const stream = await item.async("base64");
            const fileName = item.name.split("/").at(-1);

            images.push({
              abi: {
                path: "image/" + fileName,
                content: stream,
              },
              name: fileName,
              description,
            });
          }
        })
      );

      const imageURLObjs = await Moralis.Web3API.storage.uploadFolder({
        abi: images.map((image) => image.abi),
      });

      const jsons = images.map((image, index) => ({
        path: `metadata/${image.name.split(".")[0]}.json`,
        content: {
          image: imageURLObjs[index].path,
          name: image.name.split(".")[0],
          description: image.description,
        },
      }));

      const nftURLObjs = await Moralis.Web3API.storage.uploadFolder({
        abi: jsons,
      });

      const nftURLs = nftURLObjs.map((urlObjs) => urlObjs.path);

      console.log("nft URLs:", nftURLs);

      res.status(200).json({
        route: "api/images/",
        success: true,
        msg: nftURLs,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ route: "api/images/", success: false, msg: error });
    }
  }
}
