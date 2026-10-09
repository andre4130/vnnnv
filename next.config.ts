import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: '/', destination: '/visual', permanent: true }];
  },
};

export default nextConfig;
