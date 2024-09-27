import Header from "./layout/Header";
import "./globals.css";
import Socials from "./layout/Socials";
import Overflay from "./layout/Overflay";
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'
import ClientScripts from "./ClientScripts";

export const metadata = {
  title: "Voyage Stoïque | La philosophie pour tous.",
  description: "À mi-chemin entre le blog et le réseau social, Voyage Stoïque pose les fondations d'une communauté de personnes intéressées par la philosophie",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <GoogleTagManager gtmId="GTM-P7393CN8" gtmScriptUrl="https://www.googletagmanager.com/ns.html?id=GTM-P7393CN8"/>
      <GoogleAnalytics gaId="G-MPHCTBGYHE" />
      <body>
      <Socials/>
      <Overflay/>
      <Header/>
      {children}
      <script async
  src="https://js.stripe.com/v3/buy-button.js">
</script>
<ClientScripts />
      </body>
    </html>
  );
}