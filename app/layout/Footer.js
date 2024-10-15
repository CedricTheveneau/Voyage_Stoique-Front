
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
 return (
  <footer>
        <nav>
        <div className="logo"><Image className="logoLight" src="/logoLight.svg" alt="Voyage Stoïque Logo" width="50" height="30"/> <Image
              className="logoDark" src="/logoDark.svg" alt="Voyage Stoïque Logo" width="50" height="30"/>
          <div className="branding">
              <h2>voyage stoïque<span style={{"color": "var(--themeAccent)"}}>.</span></h2><span>|</span>
              <p>la philosophie pour tous<span style={{"color": "var(--themeAccent)"}}>.</span></p>
          </div>
      </div>
            <div className="navbar">
                <ul className="links">
                    <li><Link href="/legals/mentions-legales" className="link" title="Consultez les Mentions Légales">mentions légales<span style={{"color": "var(--themeAccent)"}}>.</span></Link>
                    </li>
                    <span className="navbarSeparator">|</span>
                    <li><Link href="/legals/charte-confidentialite" className="link" title="Consultez la Charte de Confidentialité">confidentialité<span style={{"color": "var(--themeAccent)"}}>.</span></Link>
                    </li>
                    <span className="navbarSeparator">|</span>
                    <li><Link href="/legals/cgu" className="link" title="Consultez les COnditions Générales d'Utilisation">CGU<span style={{"color": "var(--themeAccent)"}}>.</span></Link>
                    </li>
                    <span className="navbarSeparator">|</span>
                    <li><Link href="/legals/cgv" className="link" title="Consultez les Conditions Générales de Vente">CGV<span style={{"color": "var(--themeAccent)"}}>.</span></Link>
                    </li>
                    <span className="navbarSeparator">|</span>
                    <li><Link href="/legals/droit-auteur" className="link" title="Consultez les informations relatives au droit d'auteur">droit d&apos;auteur<span style={{"color": "var(--themeAccent)"}}>.</span></Link>
                    </li>
                    <span className="navbarSeparator">|</span>
                    <li><Link href="/legals/licence" className="link" title="Consultez la licence de distribution de la plateforme">licence<span style={{"color": "var(--themeAccent)"}}>.</span></Link>
                    </li>
                    <span className="navbarSeparator">|</span>
                    <li><Link href="mailto:contact.voyagestoique@gmail.com" className="link" title="Contactez-nous concernant une demande liée à vos droits ou autre">contact<span style={{"color": "var(--themeAccent)"}}>.</span></Link></li>
                </ul>
            </div>
        </nav>
    </footer>
 );
}