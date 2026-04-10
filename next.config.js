/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // обязательно для статического деплоя
  images: {
    unoptimized: true
  },
  trailingSlash: true,
};

export default nextConfig;
