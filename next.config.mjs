/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pro2-bar-s3-cdn-cf3.myportfolio.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**'
      }
    ]
  },
  experimental: {
    scrollRestoration: false
  }
};

export default nextConfig;
