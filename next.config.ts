import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { qualities: [75, 90] },
  async redirects() {
    return [{ source: "/app", destination: "/app/index.html", permanent: false }];
  },
};

export default nextConfig;
