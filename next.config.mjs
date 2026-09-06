/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: false,
  output: "export",
  images: {
    unoptimized: true
  },
  trailingSlash: true
};

export default nextConfig;
