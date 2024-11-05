/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'cloudflare-ipfs.com' || 'avatars.githubusercontent.com'
      }
    ]

  },
};

export default nextConfig;
