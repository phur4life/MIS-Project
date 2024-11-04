/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Optional: Enables React's Strict Mode
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "**", // Allows all paths under this hostname
      },
    ],
  },
};
export default nextConfig;
