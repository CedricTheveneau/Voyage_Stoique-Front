import Image from "next/image";
import Link from "next/link";
// const apiGateway = process.env.NEXT_PUBLIC_API_GATEWAY_URI;

export default function Header() {
 return (
  <header className="header">
  <nav>
      <div className="logo"><Image className="logoLight" src="../../public/next.svg" alt="Lightning UI Logo" width="50" height="101"/> <Image
              className="logoDark" src="../../public/next.svg" alt="Lightning UI Logo" width="50" height="101"/>
          <div className="branding">
              <h1>Lightning UI</h1><span>|</span>
              <p>V2.0.0 - <Link href="https://www.weather.gov/otx/Glossary_of_Weather_Terms"
                      title="Discover the version name's meaning">Jet Stream</Link></p>
          </div>
      </div>
      <div className="navbar">
          <ul className="links">
              <li><button className="darkModeToggle" aria-label="Dark mode toggle"><svg alt="Dark mode - moon"
                          className="darkModeToggleSVG" id="moon" width="24" height="24" viewBox="0 0 24 24"
                          fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd"
                              d="M11.4863 4.76792C7.72194 5.03144 4.75 8.16865 4.75 12C4.75 16.0041 7.99594 19.25 12 19.25C15.2079 19.25 17.9297 17.1662 18.8848 14.2787C18.1497 14.5824 17.3441 14.75 16.5 14.75C13.0482 14.75 10.25 11.9518 10.25 8.5C10.25 7.10086 10.7101 5.80909 11.4863 4.76792ZM3.25 12C3.25 7.16751 7.16751 3.25 12 3.25C12.4496 3.25 12.8918 3.28398 13.3239 3.34962C13.6229 3.39503 13.8654 3.61553 13.9388 3.90886C14.0123 4.20219 13.9025 4.51095 13.6602 4.69194C12.4992 5.55935 11.75 6.94208 11.75 8.5C11.75 11.1234 13.8766 13.25 16.5 13.25C17.6342 13.25 18.6738 12.8534 19.4905 12.1906C19.7252 12.0002 20.0513 11.9692 20.3176 12.1121C20.584 12.255 20.7386 12.5437 20.7097 12.8446C20.2843 17.2812 16.5477 20.75 12 20.75C7.16751 20.75 3.25 16.8325 3.25 12Z"
                              fill="#deff0a" />
                      </svg> <svg alt="Light mode - sun" className="darkModeToggleSVGtoggle" id="sun" width="24"
                          height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                              d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V3C12.75 3.41421 12.4142 3.75 12 3.75C11.5858 3.75 11.25 3.41421 11.25 3V2C11.25 1.58579 11.5858 1.25 12 1.25Z"
                              fill="black" />
                          <path fillRule="evenodd" clipRule="evenodd"
                              d="M6.25 12C6.25 8.82436 8.82436 6.25 12 6.25C15.1756 6.25 17.75 8.82436 17.75 12C17.75 15.1756 15.1756 17.75 12 17.75C8.82436 17.75 6.25 15.1756 6.25 12ZM12 7.75C9.65279 7.75 7.75 9.65279 7.75 12C7.75 14.3472 9.65279 16.25 12 16.25C14.3472 16.25 16.25 14.3472 16.25 12C16.25 9.65279 14.3472 7.75 12 7.75Z"
                              fill="black" />
                          <path
                              d="M5.45928 4.39862C5.16638 4.10573 4.69151 4.10573 4.39862 4.39862C4.10572 4.69152 4.10572 5.16639 4.39862 5.45929L5.10572 6.16639C5.39862 6.45929 5.87349 6.45929 6.16638 6.16639C6.45928 5.8735 6.45928 5.39862 6.16638 5.10573L5.45928 4.39862Z"
                              fill="black" />
                          <path
                              d="M22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H21C20.5858 12.75 20.25 12.4142 20.25 12C20.25 11.5858 20.5858 11.25 21 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12Z"
                              fill="black" />
                          <path
                              d="M19.6014 5.45928C19.8943 5.16638 19.8943 4.69151 19.6014 4.39862C19.3085 4.10572 18.8336 4.10572 18.5407 4.39862L17.8336 5.10572C17.5407 5.39862 17.5407 5.87349 17.8336 6.16638C18.1265 6.45928 18.6014 6.45928 18.8943 6.16638L19.6014 5.45928Z"
                              fill="black" />
                          <path
                              d="M12 20.25C12.4142 20.25 12.75 20.5858 12.75 21V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V21C11.25 20.5858 11.5858 20.25 12 20.25Z"
                              fill="black" />
                          <path
                              d="M18.8943 17.8336C18.6014 17.5407 18.1266 17.5407 17.8337 17.8336C17.5408 18.1265 17.5408 18.6014 17.8337 18.8943L18.5408 19.6014C18.8337 19.8943 19.3085 19.8943 19.6014 19.6014C19.8943 19.3085 19.8943 18.8336 19.6014 18.5407L18.8943 17.8336Z"
                              fill="black" />
                          <path
                              d="M3.75 12C3.75 12.4142 3.41421 12.75 3 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H3C3.41421 11.25 3.75 11.5858 3.75 12Z"
                              fill="black" />
                          <path
                              d="M6.16632 18.8943C6.45921 18.6014 6.45921 18.1265 6.16632 17.8336C5.87342 17.5407 5.39855 17.5407 5.10566 17.8336L4.39855 18.5407C4.10566 18.8336 4.10566 19.3085 4.39855 19.6014C4.69144 19.8943 5.16632 19.8943 5.45921 19.6014L6.16632 18.8943Z"
                              fill="black" />
                      </svg></button></li>
              <li><Link href="./" className="link" title="Access the home page">Blog</Link></li><span
                  className="navbarSeparator">|</span>
              <li><Link href="./pages/news.html" className="link" title="Access the news page">Thinking Corner</Link></li><span
                  className="navbarSeparator">|</span>
              <li><stripe-buy-button
  buy-button-id="buy_btn_1Q3DymP4ZqlfMn4IECVmRjxv"
  publishable-key="pk_test_51Q3DR9P4ZqlfMn4IryVT6prEVuMJIJCUChHNh6SSPLBDI7UAcy2mtW3Nf9WJwJYBhSMc3zPBBQZSmBDTEbYBLdKa00LBY8OyiV"
>
</stripe-buy-button></li>
          </ul>
      </div>
  </nav>
</header>
 );
}