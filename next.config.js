/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cdn.jsdelivr.net",
      "raw.githubusercontent.com",
      "images.ctfassets.net",
      "upload.wikimedia.org",
      "mui.com",
      "commons.wikimedia.org",
    ],
  },
};

module.exports = nextConfig;
