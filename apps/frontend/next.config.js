/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["gateway.pinata.cloud", "ipfs.moralis.io"],
  },
};

module.exports = nextConfig;
