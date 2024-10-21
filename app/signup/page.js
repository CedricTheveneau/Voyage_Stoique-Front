"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [newsSubscription, setNewsSubscription] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  const registerUser = async () => {
    if (!username || !email || !password || !birthday) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_GATEWAY_URI}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password, birthday, newsSubscription }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      router.push("/login");
    } catch (error) {
      setResponseMessage("Erreur lors de l'inscription");
      console.error("Erreur lors de la requête de création de compte :", error);
    }
  };

  return (
    <main className="signup fit-mobile">
      <h2>Créer un compte<span style={{ color: "var(--themeAccent)" }}>.</span></h2>
      <form onSubmit={handleSubmit}>
        <div className="formLine">
      <label htmlFor="username" >Votre pseudo</label>
      <input
        id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <div className="formLine">
        <label htmlFor="email" >Votre adresse email</label>
        <input
        id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div className="formLine">
        <label htmlFor="password" >Votre mot de passe</label>
        <input
        id="password"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <div className="formLine">
        <label htmlFor="birthday" >Votre date de naissance <br/><span>&#40;elle sera utilisée afin de vous protéger de contenu sensible si vous êtes mineur&#41;</span></label>
        <input
        id="birthday"
          type="date"
          placeholder="Date de naissance"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
        </div>
        <div className="formLine">
        <label htmlFor="newsSubscription" >Souhaitez-vous être abonné aux newsletters hebdomadaires ? <br/><span>&#40;Cochez la case si vous le souhaitez&#41;</span></label>
        <input
        id="newsSubscription"
          type="checkbox"
          value={newsSubscription}
          onChange={(e) => setNewsSubscription(e.target.checked)}
        />
        </div>
        <button type="submit">S&apos;inscrire <svg alt="Arrow" className="ctaArrow" width="79" height="30" viewBox="0 0 79 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M77.5815 20.3378C78.5578 19.3615 78.5578 17.7786 77.5815 16.8023L61.6716 0.892399C60.6953 -0.0839119 59.1124 -0.0839119 58.1361 0.892399C57.1597 1.86871 57.1597 3.45162 58.1361 4.42793L72.2782 18.5701L58.1361 32.7122C57.1597 33.6885 57.1597 35.2714 58.1361 36.2477C59.1124 37.224 60.6953 37.224 61.6716 36.2477L77.5815 20.3378ZM0.813721 21.0701H75.8137V16.0701H0.813721V21.0701Z"></path>
                        </svg></button>
      </form>
      <div className="signupPrompt">
      <h3>Vous avez déjà un compte ?</h3>
      <Link className="link" href="/login">Connectez vous !</Link>
      </div>
      {responseMessage && <p>{responseMessage}</p>}
    </main>
  );
}