/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.GITHUB_ACTIONS ? '/Hamnavaz' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
