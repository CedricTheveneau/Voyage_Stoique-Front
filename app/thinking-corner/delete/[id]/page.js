"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import styles from "../../../page.module.css";

export default function DeleteCard() {
  const [error, setError] = useState(null);
  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];

  const router = useRouter();

  useEffect(() => {
    const deleteCard = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.token) {
        setError("Token non trouvé dans le localStorage");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/kards/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        router.push(`/kard/`);
      } catch (error) {
        setError(error.message);
      }
    };

    deleteCard(); // Call the function here
  }, [pathname, router, id]);

  return (
    <div>
      <h1>Supprimer une carte</h1>
      {error && <p style={{ color: "red" }}>Erreur : {error}</p>}
    </div>
  );
}