import type { NextConfig } from "next";

const strapiUrl = process.env.STRAPI_URL ?? "http://localhost:1337";
const strapiHost = new URL(strapiUrl);

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: strapiHost.protocol.replace(":", "") as "http" | "https",
        hostname: strapiHost.hostname,
        port: strapiHost.port || undefined,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
