/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIgnores: ["./generated/**/*"],
  },
};

export default nextConfig;
