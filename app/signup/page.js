"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  const registerUser = async () => {
    if (!email || !password) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_GATEWAY_URI}/auth/register`,
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
      router.push("/login");
    } catch (error) {
      setResponseMessage("Erreur lors de l'inscription");
      console.error("Erreur lors de la requête de création de compte :", error);
    }
  };

  return (
    <div>
      <h1>Créer un compte</h1>
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
        <button type="submit">S&apos;inscrire</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}