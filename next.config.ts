import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["momentum.redberryinternship.ge"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://momentum.redberryinternship.ge/api/:path*", // Make sure this matches your backend API routes
      },
    ];
  },
};

export default nextConfig;
