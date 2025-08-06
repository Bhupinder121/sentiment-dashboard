import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/dashboard',
        destination: 'http://192.168.0.118:8000/*',
      },
    ]
  },
  /* config options here */
};

export default nextConfig;
