"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from '../layout/GlobalContext';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { setIsAuthenticated, setUserId, setUserRole, setIsSubscribed, setUserUsername } = useGlobalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset the error message

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_GATEWAY_URI}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const user = {
        user: data.updatedUser,
        token: data.token,
      };

      localStorage.setItem("user", JSON.stringify(user));
      setIsAuthenticated(true);
      setUserId(data.updatedUser._id);
      setUserUsername(data.updatedUser.username)
      setUserRole(data.updatedUser.role);
      setIsSubscribed(data.updatedUser.newsSubscription)
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la requête de connexion :", error);
      setErrorMessage(
        "Erreur lors de la connexion. Vérifiez vos identifiants."
      );
    }
  };

  return (
    <main className="signup">
      <h2>Se connecter</h2>
      
      <form onSubmit={handleSubmit}>
        
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
        <button type="submit">Se connecter <svg alt="Arrow" className="ctaArrow" width="79" height="30" viewBox="0 0 79 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M77.5815 20.3378C78.5578 19.3615 78.5578 17.7786 77.5815 16.8023L61.6716 0.892399C60.6953 -0.0839119 59.1124 -0.0839119 58.1361 0.892399C57.1597 1.86871 57.1597 3.45162 58.1361 4.42793L72.2782 18.5701L58.1361 32.7122C57.1597 33.6885 57.1597 35.2714 58.1361 36.2477C59.1124 37.224 60.6953 37.224 61.6716 36.2477L77.5815 20.3378ZM0.813721 21.0701H75.8137V16.0701H0.813721V21.0701Z"></path>
                        </svg></button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </main>
  );
}