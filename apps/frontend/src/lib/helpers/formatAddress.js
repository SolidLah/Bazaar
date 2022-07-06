export default function formatAddress(address) {
  return `${address.slice(0, 3)}...${address.slice(38)}`;
}
