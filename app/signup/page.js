import Link from "next/link";
import { Form } from "./form";

export function generateMetadata() {
  const pageTitle = "Créer un Compte | Voyage Stoïque";
  const pageDescription = "Rejoignez la communauté Voyage Stoïque et accédez à des fonctionnalités exclusives comme publier des posts, des commentaires, upvoter, créer des listes de lectures et recevoir des recommandations personnalisées ! Créez un compte et bénéficiez de tout ce que Voyage Stoïque a à vous offrir !";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "website",
      url: "https://www.voyage-stoique.com/signup",
      site_name: "Voyage Stoïque",
    },
  };
}

export default function SignUp() {
  return (
    <main className="signup fit-mobile">
      <h2>Créer un compte<span style={{ color: "var(--themeAccent)" }}>.</span></h2>
      <Form />
      <div className="signupPrompt">
        <h3>Vous avez déjà un compte ?</h3>
        <Link className="link" href="/login">Connectez-vous !</Link>
      </div>
    </main>
  );
}