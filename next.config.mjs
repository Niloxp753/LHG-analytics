/** @type {import('next').NextConfig} */
const nextConfig = {
	cacheComponents: true,
	partialPrefetching: true,
  cacheLife: {
    dashboard: {
      stale: 30,
      revalidate: 30,
      expire: 300,
    },
    dashboard_historical: {
      stale: 300,
      revalidate: 900,
      expire: 86400,
    },
    dashboard_fast: {
      stale: 30,
      revalidate: 10,
      expire: 60,
    },
    dashboard_session: {
      stale: 900,
      revalidate: 900,
      expire: 1800,
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
