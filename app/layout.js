import Header from "./layout/Header";
import "./globals.css";
import Socials from "./layout/Socials";
import Overflay from "./layout/Overflay";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import ClientScripts from "./ClientScripts";
import { GlobalProvider } from "./layout/GlobalContext";
import Footer from "./layout/Footer";

export const metadata = {
  title: "Voyage Stoïque | La philosophie pour tous.",
  description:
    "À mi-chemin entre le blog et le réseau social, Voyage Stoïque pose les fondations d'une communauté de personnes intéressées par la philosophie",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
      <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192x192.png" />
          <link rel="apple-touch-icon" sizes="512x512" href="/icons/icon-512x512.png" />
          <meta name="theme-color" content="#141414" />
<link rel="apple-touch-startup-image" href="images/splash/640x1136.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/> 
<link rel="apple-touch-startup-image" href="images/splash/750x1294.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/> 
<link rel="apple-touch-startup-image" href="images/splash/1242x2148.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"/>
<link rel="apple-touch-startup-image" href="images/splash/1125x2436.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"/> 
<link rel="apple-touch-startup-image" href="images/splash/1536x2048.png" media="(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"/> 
<link rel="apple-touch-startup-image" href="images/splash/1668x2224.png" media="(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"/> 
<link rel="apple-touch-startup-image" href="images/splash/2048x2732.png" media="(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"/> 
      </head>
      <GoogleTagManager
        gtmId="GTM-P7393CN8"
        gtmScriptUrl="https://www.googletagmanager.com/ns.html?id=GTM-P7393CN8"
      />
      <GoogleAnalytics gaId="G-MPHCTBGYHE" />
      <GlobalProvider>
        <body>
          <Socials />
          <Overflay />
          <Header />
          {children}
          <Footer />
          <ClientScripts />
        </body>
      </GlobalProvider>
    </html>
  );
}
