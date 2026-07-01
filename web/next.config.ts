import type { NextConfig } from "next";

const strapiUrl = process.env.STRAPI_URL?.replace("://localhost", "://127.0.0.1") ?? "http://127.0.0.1:1337";
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
