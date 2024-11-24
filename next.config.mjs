/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "tjubskehgtxyzocvldoy.supabase.co",
        pathname: "/storage/v1/object/public/cabin-images/**",
        protocol: "https",
        port: "",
      },
      {
        hostname: "dclaevazetcjjkrzczpc.supabase.co",
        pathname: "/storage/v1/object/public/cabin-images/**",
        protocol: "https",
        port: "",
      },
    ],
  },
  // output: "export",
};

export default nextConfig;
