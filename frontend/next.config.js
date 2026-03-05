/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001',
  },
  // Production optimization
  compress: true,
  poweredByHeader: false,
  
  // Output standalone for Docker
  output: 'standalone',
}

module.exports = nextConfig
