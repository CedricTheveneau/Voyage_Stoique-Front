import Link from "next/link";

export default function CharteConfidentialite() {
  return (
    <main className="legals">
        <div className="content fit">
            <h2 className="centered">Charte de confidentialité</h2><br/>
            <p>Ici, vous pourrez retrouver tout ce que vous voudriez savoir concernant l&apos;la collecte de données sur le site, les raisons de leur collecte et à quelles fins elles sont utilisées. Vous retrouverez également des informations concernant les lois qui s&apos;y appliquent.</p>
            <p>Veuillez noter que, à tout moment, vous pouvez envoyer une requête d&apos;information à propos de ces
                informations ; en envoyant un email à cette adresse <Link href="mailto:dpo@voyagestoique.com" title="Envoyez un email pour demander des informations relatives au site">dpo@voyagestoique.com</Link>.</p>
        </div>
        <div className="content fit">
            <div className="gridBlocs">
                <div className="info">
                    <h3>Données essentielles au fonctionnement de la plateforme<span style={{"color": "var(--themeAccent)"}}>.</span></h3>
                    <p>Voyage Stoïque récupèrera, en tant que données nécessaires à son bon fonctionnement, la donnée personnelle suivante :</p>
                    <ul>
                     <li>l&apos;âge de l&apos;utilisateur.</li>
                    </ul>
                    <p>Cette donnée sera utilisée à des fins de protection des utilisateurs face à du contenu potentiellement sensible ou inapproprié.</p>
                    <p>Le but est de prévenir l&apos;exposition de mineurs à des articles traitant de contenu violent, marquant, choquant ou à caractère sexuel.</p>
                    <p>D&apos;autres informations nécessaires au bon fonctionnement de l&apos;application seront collectées :</p>
                    <ul>
                      <li>le pseudonyme,</li>
                      <li>le mot de passe,</li>
                      <li>l&apos;adresse email de l&apos;utilisateur.</li>
                    </ul>
                    <p>Ces trois informations serviront à identifier et authentifier l&apos;utilisateur sur la plateforme, lui permettre de récupérer l&apos;accès à un compte dont il aurait perdu les identifiants et gérer ses accès à diverses fonctionnalités et au contenu.</p>
                    <p>L&apos;adresse email de l&apos;utilisateur pourra être utilisée à des fins d&apos;envoi de newsletters relatives au contenu de la plateforme. Cela s&apos;effectuera uniquement si l&apos;utilisateur donne son consentement, par défaut, l&apos;abonnement aux newsletters est désactivé.</p>
                </div>
                <div className="info">
                    <h3>Données non-essentielles au fonctionnement de la plateforme<span style={{"color": "var(--themeAccent)"}}>.</span></h3>
                    <p>D&apos;autres données, non essentielles mais ajoutant de l&apos;agrément à l&apos;expérience utilisateur peuvent être collectées, si l&apos;utilisateur y consent :</p>
                    <ul>
                     <li>la durée passée à consulter des articles,</li>
                     <li>le nombre d&apos;articles consultés,</li>
                     <li>le temps total passé sur la plateforme.</li>
                    </ul>
                    <p>Ces données permettent d&apos;alimenter le profil de l&apos;utilisateur, d&apos;apporter un sens du challenge auprès de la communauté et de créer de l&apos;engagement régulier sur la plateforme afin de la faire vivre. Elles seront stockées indéfiniment et seront effacées en même temps que le reste des données liées à l&apos;utilisateur, lors de l&apos;éventuelle clôture de son compte.</p>
                </div>
                <div className="info">
                    <h3>Données et affiliations<span style={{"color": "var(--themeAccent)"}}>.</span></h3>
                    <p>L&apos;entièreté des données est conservée dans notre base de données, hébergée chez Digital Ocean (vous pouvez retrouver plus d&apos;informations au sujet de la solution d&apos;hébergement sur la page <Link href="/legals/mentions-legales" title="Consulter les mentions légales">mentions légales</Link>).</p>
<p>Aucune donnée recueillie n&apos;est utilisée à des fins publicitaires.</p>
                    <p>La plateforme n&apos;est affiliée à aucune autre entité.</p>
                    <p>Notez cependant que dans le cadre légal, l&apos;État peut demander à accéder aux données collectées.</p>
                </div>
                <div className="info">
                    <h3>Collecte de données et consentement<span style={{"color": "var(--themeAccent)"}}>.</span></h3>
                    <p>La solution utilisée pour recueillir le consentement des utilisateurs à l&apos;utilisation de cookies est <Link href="https://www.axept.io/fr/" title="En savoir plus sur axeptio">axeptio</Link>.</p>
                </div>
                <div className="info">
                    <h3>Informations relatives aux cookies<span style={{"color": "var(--themeAccent)"}}>.</span></h3>
                    <p>Les cookies sont des espaces servant à stocker des données dans votre navigateur, ils sont généralement utilisés pour personnaliser l&apos;expérience de l&apos;utilisateur. D&apos;autres sont également essentiels au bon fonctionnement d&apos;une plateforme.</p>
<p>Voyage Stoïque utilise les cookies à des fins d&apos;authentification et de personnalisation de l&apos;expérience utilisateur.</p>
<p>Veuillez noter que la plateforme est connectée à Google Analytics, qui est susceptible de récupérer des données liées à votre navigation sur le site, à des fins d&apos;analyses, nous permettant de parfaire ladite plateforme.</p>
<p>Cela ne s&apos;effectuera que si vous nous en donnez l&apos;autorisation, via le formulaire de paramétrage des cookies, présenté par axeptio, lors de votre arrivée sur le site.</p>
                </div>
                <div className="info">
                    <h3>Sécurité des données<span style={{"color": "var(--themeAccent)"}}>.</span></h3>
                    <p>Toutes les données d&apos;authentification stockées dans nos bases de données sont encryptées afin de prévenir quelconque risque d&apos;exploitation des données, si une fuite venait à se produire.</p>
                    <p>Dans le cas d&apos;une fuite de données de nos bases, vous serez contacté dans les 72 heures suivant l&apos;incident afin de vous en avertir. Les raisons de la fuite vous seront détaillées, ainsi que la liste des données compromises vous concernant. Nous vous indiquerons également quelle procédure à suivre afin d&apos;assurer la protection de vos données et comptes d&apos;autres plateformes.</p>
                </div>
                <div className="info">
                    <h3>Conservation des données<span style={{"color": "var(--themeAccent)"}}>.</span></h3>
                    <p>À la suite d&apos;une période d&apos;inactivité de 24 mois et suite à 2 emails d&apos;information concernant la suppression imminente de son compte, l&apos;entièreté des données liées à l&apos;utilisateur seront effacées des bases de données de la plateforme. Ce dernier se verra envoyé par email un dossier comprenant l&apos;entièreté du contenu qu&apos;il a posté sur la plateforme, ainsi qu&apos;une notice indiquant que ce contenu a été supprimé de notre plateforme et que les droits d&apos;auteur de ces derniers lui reviennent.</p>
                </div>
                <div className="info">
                    <h3>Les droits de l&apos;utilisateur<span style={{"color": "var(--themeAccent)"}}>.</span></h3>
                    <p>L&apos;utilisateur bénéficie du droit, à tout moment, de refuser la collecte de ses données personnelles. Le cas échéant, certaines fonctionnalités de la plateforme lui seront accessibles (accès à certains articles au contenu sensible pour les mineurs, accès à la plateforme communautaire, accès à un profil personnalisé, accès à des listes et historiques de lecture).</p>
                    <p>L&apos;utilisateur ayant déjà un compte, peut, à tout moment, effectuer une demande de suppression de ce dernier, entraînant la suppression immédiate de son compte et de toutes les données qui lui sont associées, des bases de données de la plateforme. Dans le cas où l&apos;utilisateur aurait publié du contenu, ce dernier lui sera restitué, avec la propriété intellectuelle et les droits d&apos;auteur.</p>
                    <p>Si l&apos;utilisateur constate que du contenu dont il est l&apos;ayant droit a été utilisé sur la plateforme sans son consentement ou sans le créditer, il peut effectuer une réclamation de suppression du contenu en question.</p>
                    <p>Dans le cas où la plateforme ne répond pas à votre requête, vous êtes en droit de contacter la CNIL et d&apos;effectuer auprès d&apos;eux, une réclamation.</p>
                    <p>Pour faire respecter ses droits, l&apos;utilisateur peut, à tout instant, envoyer sa demande aux adresses suivantes : <Link href="mailto:dpo@voyagestoique.com" title="Adresser par email une demande de faire valoir de ses droits">dpo@voyagestoique.com</Link> | <Link href="mailto:contact@voyagestoique.com" title="Adresser par email une demande de faire valoir de ses droits">contact@voyagestoique.com</Link> | <Link href="mailto:theveneaucedricpro@gmail.com" title="Adresser par email une demande de faire valoir de ses droits">theveneaucedricpro@gmail.com</Link>.</p>
                </div>
                <div className="info">
                    <h3>Évolution de la charte de confidentialité<span style={{"color": "var(--themeAccent)"}}>.</span></h3>
                    <p>La charte de confidentialité est amenée à évoluer avec le temps, en raison de l&apos;entrée en vigueur de nouvelles lois ou encore de l&apos;évolution de la plateforme.</p>
                    <p>À chaque changement de la charte, il vous sera demandé de la consulter et d&apos;y consentir afin d&apos;accéder à la plateforme.</p>
                    <strong>Dernière mise à jour de la charte de confidentialité :18/09/2024 - 15:43</strong>
                </div>
            </div>
        </div>
    </main>
  );
}