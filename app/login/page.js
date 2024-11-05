import Link from "next/link";
import { Form } from "./form";

export function generateMetadata() {
  const pageTitle = "Se Connecter | Voyage Stoïque";
  const pageDescription = "Accédez à vos listes de lectures, publiez des posts, des commentaires et upvotez ceux des autres membres de la communauté Voyage Stoïque ! Gérez également votre profil et votre abonnement aux newsletters !";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "website",
      url: "https://www.voyage-stoique.com/login",
      site_name: "Voyage Stoïque",
    },
  };
}

export default function Login() {
  return (
    <main className="signup">
      <h2>Se connecter<span style={{ color: "var(--themeAccent)" }}>.</span></h2>
      <Form/>
      <div className="signupPrompt">
      <h3>Vous n&apos;avez pas de compte ?</h3>
      <Link className="link" href="/signup">Créez en un !</Link>
      </div>
      
    </main>
  );
}