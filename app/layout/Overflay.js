
import styles from "../page.module.css";
import Link from "next/link";

export default function Overflay() {
 return (
  <div className="overflay"><Link href="#" title="Get back to the top of the page"><svg alt="Arrows" className="scrollArrows"
                width="54" height="64" viewBox="0 0 54 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 43.7L27.5 60.2L44 43.7" stroke="#03001F" strokeWidth="4" strokeLinecap="round" />
                <path d="M6 23.45L26.625 44.075L47.25 23.45" stroke="#03001F" strokeWidth="4" strokeLinecap="round" />
                <path d="M2 2.94995L26.75 27.7L51.5 2.94995" stroke="#03001F" strokeWidth="4" strokeLinecap="round" />
            </svg></Link></div>
 );
}