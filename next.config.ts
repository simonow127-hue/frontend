import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["10.32.250.173", "localhost"],
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [],
  },
};

export default nextConfig;
