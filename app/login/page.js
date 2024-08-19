"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

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
        userId: data.userId,
        token: data.token,
      };

      localStorage.setItem("user", JSON.stringify(user));

      router.push("/kard/create");
    } catch (error) {
      console.error("Erreur lors de la requête de connexion :", error);
      setErrorMessage(
        "Erreur lors de la connexion. Vérifiez vos identifiants."
      );
    }
  };

  return (
    <div>
      <h1>Se connecter</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}