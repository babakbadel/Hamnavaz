/** @type {import("next").NextConfig} */
const nextConfig = {
  // Single canonical frontend for Hamnavaz.
  output: "export",
  basePath: "/Hamnavaz",
  assetPrefix: "/Hamnavaz/",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
