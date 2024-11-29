'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../../layout/GlobalContext";

export default function Login({ params }) {
  const { apiGateway } =
  useGlobalContext();
  const { token } = params;
  const [data, setData] = useState(null)
  const router = useRouter();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const confirmationResponse = await fetch(
          `${apiGateway}/auth/confirm-email/${token}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (!confirmationResponse.ok) {
          const response = await confirmationResponse.json();
        setData(response);
          throw new Error(
            "Une erreur est survenue lors de la vérification de votre adresse email"
          );
        }
  
        const response = await confirmationResponse.json();
        console.log(response);
        
  
        setData(response);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des recommandations:",
          error
        );
      }
    }
    confirmEmail()

    setTimeout(() => {
      router.push('/login')
    }, 15000)
  }, [token])

  return (
    <main className="confirmPopUp">
    {data !== null ? <><h2>{data.message.title}</h2>
      <p>{data.message.content ? data.message.content : data.message}</p>
      {data.message.content ? <div className="signupPrompt">
      <p>Vous allez être redirigé très prochainement vers la page de connexion.</p>
      <p>Si après 15 secondes, vous n&apos;avez pas été redirigé vers la page de connexion, cliquez sur le lien ci-dessous.</p>
      <Link className="link" href="/login">Je me connecte !</Link>
      </div> 
      : data.message &&
      <div className="signupPrompt">
      <p>Une erreur s&apos;est produite lors de la vérification de votre compte. Veuillez réessayer ultérieurement</p>
      <p>Vous serez redirigé vers la page de connexion d&apos;ici 15 secondes. Passé ce délai, si vous n&apos;avez pas été redirigé, cliquez sur le lien ci-dessous pour retourner à l&apos;accueil.</p>
      <Link className="link" href="/">Je retourne à l&apos;accueil !</Link>
      </div>
      }
      </> : <p>Confirmation de l&apos;email en cours...</p>}
    </main>
  );
}