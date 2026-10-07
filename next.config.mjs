/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML in `out/` for S3 + CloudFront. No Node server in production.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
