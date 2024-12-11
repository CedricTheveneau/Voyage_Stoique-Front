import Link from "next/link";

export default function Cgv() {
  return (
    <main className="legals">
        <div className="content fit">
            <h2 className="centered">Conditions Générales de Vente<span style={{ color: "var(--themeAccent)" }}>.</span></h2><br/>
            <p>Ici, vous pourrez retrouver tout ce que vous voudriez savoir concernant les façons dont la plateforme génère des revenus, et à quelles fins ils sont utilisés.</p>
            <p>Veuillez noter que, à tout moment, vous pouvez envoyer une requête d&apos;information à propos de ces
                informations ; en envoyant un email à cette adresse <Link href="mailto:dpo.voyagestoique@gmail.com" title="Envoyez un email pour demander des informations relatives au site">dpo.voyagestoique@gmail.com</Link>. Vous pouvez également nous contacter directement depuis notre <Link href="/contact" title="Contactez l'équipe Voyage Stoïque via le formulaire de contact">formulaire de contact</Link>.</p>
        </div>
        <div className="content">
            <div className="gridBlocs">
            <div className="info">
                    <h3>Systèmes de paiement et d&apos;abonnement<span style={{"color": "var(--themeAccent)"}}>.</span></h3>
                    <p>Aucun système d&apos;abonnement n&apos;est mis en place.</p>
<p>Un système de donation non obligatoire, employant la technologie <Link href="https://stripe.com/fr" title="En savoir plus sur Stripe">Stripe</Link> est mis en place sur la plateforme.</p>
<p>Les donations seront utilisées à des fins de maintenance et d&apos;amortissement des coups d&apos;utilisation de la plateforme.</p>
                </div>
                <div className="info">
                    <h3>Partenariats commerciaux<span style={{"color": "var(--themeAccent)"}}>.</span></h3>
                    <p>Aucun partenariat commercial n&apos;est actuellement en place sur la plateforme.</p>
<p>Avec l&apos;évolution de la plateforme, des partenariats seront probablement envisagés, dès lors, les Conditions Générales de Vente seront mises à jour et il vous sera demandé de les accepter.</p>
                </div>
            </div>
        </div>
    </main>
  );
}