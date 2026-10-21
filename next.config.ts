import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { qualities: [75, 90] },
  async redirects() {
    return [{ source: "/tour-the-course", destination: "/map", permanent: true }];
  },
};

export default nextConfig;
