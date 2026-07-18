/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",                       // site statique → GitHub Pages
  basePath: process.env.NODE_ENV === "production" ? "/42-exam-train" : "",
  images: { unoptimized: true },
};
export default nextConfig;
