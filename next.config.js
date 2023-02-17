/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'olx.ba',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
