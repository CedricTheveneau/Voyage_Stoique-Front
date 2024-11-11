import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
});

export default withPWA({
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
});