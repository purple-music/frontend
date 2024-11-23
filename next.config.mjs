import nextIntl from "next-intl/plugin";

const withNextIntl = nextIntl();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
};

export default withNextIntl(nextConfig);

