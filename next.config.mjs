/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.yandex.net",
      },
      {
        protocol: "https",
        hostname: "t.me",
      },
    ],
  },
};

export default nextConfig;
