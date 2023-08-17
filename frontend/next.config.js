/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_APP_BACKEND_API: process.env.NEXT_APP_BACKEND_API,
  },
}

module.exports = nextConfig
