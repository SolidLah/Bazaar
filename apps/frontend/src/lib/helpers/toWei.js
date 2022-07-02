import { ethers } from "ethers";

export default function toWei(num) {
  return ethers.utils.parseEther(num.toString());
}
