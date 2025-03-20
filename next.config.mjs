/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'dharmgyan.com'
        },
        {
          protocol: 'https',
          hostname: 'bhaktiras.in'
        },
        {
          protocol: 'https',
          hostname: 'staging.bhaktiras.in'
        },
        {
          protocol: 'https',
          hostname: 'dummyimage.com'
        },
      ]
    }
};

export default nextConfig;
