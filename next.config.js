/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "plus.unsplash.com",
      "images.unsplash.com",
      "th.bing.com",
      "i.pinimg.com",
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
