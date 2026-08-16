/** @type {import("next").NextConfig} */
const nextConfig = {
  // Canonical frontend for Hamnavaz GitHub Pages deployment.
  output: "export",
  images: {
    unoptimized: true,
  },

  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
  ],
};

export default nextConfig;
