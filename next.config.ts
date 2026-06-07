import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ["@prisma/client", "@prisma/adapter-pg", "bcryptjs", "pg"],
};

export default nextConfig;
