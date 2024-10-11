/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_GATEWAY_URI: process.env.NEXT_PUBLIC_API_GATEWAY_URI,
    NEXT_PUBLIC_API_TOKEN_SECRET: process.env.NEXT_PUBLIC_API_TOKEN_SECRET,
  },
  images: {
   remotePatterns: [
     {
       protocol: 'https',
       hostname: '**', // Autorise tous les hôtes externes
     },
   ],
 },
 };
 
 export default nextConfig;