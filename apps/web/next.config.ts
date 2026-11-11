import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yfhjgwrvedduvmndfmqb.supabase.co',
      },
    ],
  },
};

export default nextConfig;
