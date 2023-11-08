/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/eos",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
