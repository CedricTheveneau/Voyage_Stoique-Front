'use client'
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../layout/GlobalContext";

export default function Thankyou() {
  const { userUsername, pathname } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(pathname);
    }, 15000);

    return () => clearTimeout(timer);
  }, [pathname, router]);

  return (
    <main className="confirmPopUp">
      <h2>Merci pour votre donation {userUsername && userUsername} !</h2>
      <p>Nous vous remercions sincèrement pour ce geste qui nous aide à maintenir Voyage Stoïque sur pied et à garantir une pseudo-gratuité de nos services à l&apos;aide de dons comme le vôtre !</p>
      <p>Vous recevrez très prochainement - ou vous avez déjà reçu - par mail votre reçu.</p>
      <p>⚠️ Veuillez noter que les dons sont en mode test. Vous ne recevrez donc pas de facture de Stripe par email. Mais rassurez-vous, aucun paiement n&apos;a eu lieu.</p>
      <p><strong>MERCI ENCORE !</strong></p>
      <p><strong>L&apos;équipe Voyage Stoïque.</strong><br /><br /><br /></p>
      <p>Vous allez être redirigé très prochainement vers la page que vous consultiez avant d&apos;effectuer votre donation.</p>
      <p>Si après 15 secondes, vous n&apos;avez pas été redirigé vers cette page, cliquez sur le lien ci-dessous.</p>
      <Link className="link" href={pathname ? pathname : '/'}>Je retourne où j&apos;étais !</Link>
    </main>
  );
}