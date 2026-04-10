/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // ← это делает сайт статическим
  images: {
    unoptimized: true
  },
  trailingSlash: true,
};

export default nextConfig;
