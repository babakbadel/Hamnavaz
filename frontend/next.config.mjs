/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  ...(isGitHubPages ? { output: 'export' } : {}),
  trailingSlash: true,
  ...(isGitHubPages ? { basePath: '/Hamnavaz' } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
