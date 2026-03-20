/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  cacheLife: {
    dashboard: {
      stale: 30,
      revalidate: 30,
      expire: 300,
    },
    dashboard_fast: {
      stale: 10,
      revalidate: 10,
      expire: 60,
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: 'cloudflare-ipfs.com' || 'avatars.githubusercontent.com'
      }
    ]

  },
};

export default nextConfig;
