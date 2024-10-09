import Link from "next/link";

export default function DroitAuteur() {
  return (
    <main className="legals">
        <div className="content fit">
            <h2 className="centered">Droit d&apos;auteur</h2><br/>
            <p>Ici, vous pourrez retrouver tout ce que vous voudriez savoir concernant le droit d&apos;auteur relatif au contenu interne et externe à la plateforme. Vous retrouverez également des informations concernant les lois qui s&apos;appliquent sur ce
                dernier.</p>
            <p>Veuillez noter que, à tout moment, vous pouvez envoyer une requête d&apos;information à propos de ces
                informations ; en envoyant un email à cette adresse <Link href="mailto:dpo@voyagestoique.com" title="Envoyez un email pour demander des informations relatives au site">dpo@voyagestoique.com</Link>.</p>
        </div>
        <div className="content">
            <div className="gridBlocs">
                <div className="info">
                    <h3>Droit d’auteur de contenu externe à la plateforme<span style={{"color": "var(--themeAccent)"}}>.</span></h3>
                    <p>Pour tout contenu posté sur la plateforme, il est indispensable de mentionner le nom de l&apos;auteur des visuels, textes, fichiers audios que vous exploitez.</p>
                    <p>Si des visuels ou pistes audio ont été générés par Intelligence Artificielle, cela doit également être mentionné.</p>
                    <strong>Sanctions</strong>
                    <p>Tout non-respect de cette clause entraînera des sanctions allant de la suppression du post à la clôture du compte utilisateur s&apos;il y a récidive.</p>
                    <p>De plus, des sanctions définies par la loi peuvent s&apos;appliquer.</p>
                </div>
                <div className="info">
                    <h3>Droit d&apos;auteur de contenu interne à la plateforme<span style={{"color": "var(--themeAccent)"}}>.</span></h3>
                    <p>La plateforme Voyage Stoïque respecte votre contenu.</p>
<p>Bien que tout contenu publié sur la plateforme revienne de droit au créateur dudit contenu, vous serez mentionné comme auteur des posts que vous rédigez.</p>
<strong>Modalités suites à la clôture d&apos;un compte</strong>
                    <p>Lors de la clôture éventuelle de votre compte, tout le contenu que vous aurez produit pour la plateforme vous sera rendu, ainsi que sa propriété intellectuelle, et donc les droits d&apos;auteur.</p>
                    <p>Vous pourrez alors en faire ce que vous voulez.</p>
                    <p>Notez cependant que le droit d&apos;auteur s&apos;applique toujours sur le contenu présent dans vos posts appartenant à d&apos;autres créateurs. Il vous est toujours demandé de le respecter, et donc de mentionner les auteurs desdits contenus.</p>
                    <strong>Sanctions</strong>
                    <p>Tout non-respect de cette clause est susceptible d&apos;entraîner des sanctions définies par la loi.</p>
                    <p>La plateforme Voyage Stoïque ne sera pas tenue responsable de vos agissements concernant la réutilisation de votre contenu suite à la clôture de votre compte.</p>
                </div>
                <div className="info">
                    <h3>Responsabilité de la plateforme<span style={{"color": "var(--themeAccent)"}}>.</span></h3>
                    <p>Voyage Stoïque ne pourra pas être tenu responsable des sanctions éventuelles que vous pourriez subir en cas de non-respect de la loi relative au droit d&apos;auteur sur la plateforme.</p>
                </div>
            </div>
        </div>
    </main>
  );
}