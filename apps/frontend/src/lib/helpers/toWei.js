import { ethers } from "ethers";

export default function toWei(numStr) {
  return ethers.utils.parseEther(numStr);
}
