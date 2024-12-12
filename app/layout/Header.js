"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "./GlobalContext";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentPath, isAuthenticated, userRole, userUsername, setIsAuthenticated, setUserRole, query, setQuery, navbarToggle, setNavbarToggle } = useGlobalContext();
  const [localQuery, setLocalQuery] = useState(query);
  const [blogClassList, setBlogCLassList] = useState("link active");
  const [agoraClassList, setAgoraClassList] = useState("link");
  const [profileClassList, setProfileCLassList] = useState("link");
  const [profileLink, setProfileLink] = useState("/login");
  const router = useRouter();

   const [showSearchBar, setShowSearchBar] = useState(false);
 
   const handleSearchIconClick = () => {
     setShowSearchBar(!showSearchBar);
   };
 
   useEffect(() => {
    const timer = setTimeout(() => {
      if (localQuery !== query) {
        setQuery(localQuery);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [localQuery]);

  useEffect(() => {
    if (localQuery) {
      router.push("/search");
    }
  }, [localQuery]);

  useEffect(() => {
    if (currentPath) {
      // Cette fonction sera appelée à chaque fois que isAuthenticated change
      if (currentPath === "/") {
        setBlogCLassList("link active");
        setAgoraClassList("link");
        setProfileCLassList("link");
      } else if (currentPath.includes("/agora")) {
        setAgoraClassList("link active");
        setBlogCLassList("link");
        setProfileCLassList("link");
      } else if (currentPath.includes("/profile")) {
        setProfileCLassList("link active");
        setAgoraClassList("link");
        setBlogCLassList("link");
      } else {
        setBlogCLassList("link");
        setAgoraClassList("link");
        setProfileCLassList("link");
      }
    }
  }, [currentPath]);

  useEffect(() => {
    // Cette fonction sera appelée à chaque fois que isAuthenticated change
    if (isAuthenticated) {
      setProfileLink(`/profile/${userUsername}`);
    } else {
      setProfileLink("/login");
    }
  }, [isAuthenticated, userUsername]);

  const handleLogoutSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUserRole(null);
    router.push("/");
    return;
  };

  return (
    <header className="header">
      <nav>
        <Link href="/" title="Revenez à l'accueil">
        <div className="logo">
          <Image
            className="logoLight"
            src="/logoLight.svg"
            alt="Voyage Stoïque Logo"
            width="50"
            height="30"
          />{" "}
          <Image
            className="logoDark"
            src="/logoDark.svg"
            alt="Voyage Stoïque Logo"
            width="50"
            height="30"
          />
          <div className="branding">
            <h1>
              voyage stoïque
              <span style={{ color: "var(--themeAccent)" }}>.</span>
            </h1>
            <span>|</span>
            <p>
              la philosophie pour tous
              <span style={{ color: "var(--themeAccent)" }}>.</span>
            </p>
          </div>
        </div>
        </Link>
        <div className={navbarToggle ? 'navbar active' : 'navbar'}>
          <ul className="links">
            <li>
              <button onClick={() => setNavbarToggle(!navbarToggle)} className="navbarToggle" aria-label="Hamburger menu">
                <svg
                  alt="Hamburger menu"
                  className={!navbarToggle ? 'navbarToggleSVG toggle' : 'navbarToggleSVG'}
                  style={{ scale: "1.2", transform: "translateY(2px)" }}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.75 12C19.75 11.5858 19.4142 11.25 19 11.25H5C4.58579 11.25 4.25 11.5858 4.25 12C4.25 12.4142 4.58579 12.75 5 12.75H19C19.4142 12.75 19.75 12.4142 19.75 12Z"
                    fill=""
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.75 7C19.75 6.58579 19.4142 6.25 19 6.25H5C4.58579 6.25 4.25 6.58579 4.25 7C4.25 7.41421 4.58579 7.75 5 7.75H19C19.4142 7.75 19.75 7.41421 19.75 7Z"
                    fill=""
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.75 17C19.75 16.5858 19.4142 16.25 19 16.25H5C4.58579 16.25 4.25 16.5858 4.25 17C4.25 17.4142 4.58579 17.75 5 17.75H19C19.4142 17.75 19.75 17.4142 19.75 17Z"
                    fill=""
                  ></path>
                </svg>
                <svg
                  alt="Close hamburger menu"
                  className={navbarToggle ? 'navbarToggleSVG toggle' : 'navbarToggleSVG'}
                  style={{ scale: "1.8", transform: "translateY(1.5px)" }}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.46445 15.5354L15.5355 8.46436"
                    stroke=""
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M8.46446 8.46458L15.5355 15.5356"
                    stroke=""
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </button>
            </li>
            <li>
              <button className="darkModeToggle" aria-label="Dark mode">
                <svg
                  alt="Dark mode - moon"
                  className="darkModeToggleSVG"
                  id="moon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.4863 4.76792C7.72194 5.03144 4.75 8.16865 4.75 12C4.75 16.0041 7.99594 19.25 12 19.25C15.2079 19.25 17.9297 17.1662 18.8848 14.2787C18.1497 14.5824 17.3441 14.75 16.5 14.75C13.0482 14.75 10.25 11.9518 10.25 8.5C10.25 7.10086 10.7101 5.80909 11.4863 4.76792ZM3.25 12C3.25 7.16751 7.16751 3.25 12 3.25C12.4496 3.25 12.8918 3.28398 13.3239 3.34962C13.6229 3.39503 13.8654 3.61553 13.9388 3.90886C14.0123 4.20219 13.9025 4.51095 13.6602 4.69194C12.4992 5.55935 11.75 6.94208 11.75 8.5C11.75 11.1234 13.8766 13.25 16.5 13.25C17.6342 13.25 18.6738 12.8534 19.4905 12.1906C19.7252 12.0002 20.0513 11.9692 20.3176 12.1121C20.584 12.255 20.7386 12.5437 20.7097 12.8446C20.2843 17.2812 16.5477 20.75 12 20.75C7.16751 20.75 3.25 16.8325 3.25 12Z"
                    fill="#deff0a"
                  />
                </svg>{" "}
                <svg
                  alt="Light mode - sun"
                  className="darkModeToggleSVG toggle"
                  id="sun"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V3C12.75 3.41421 12.4142 3.75 12 3.75C11.5858 3.75 11.25 3.41421 11.25 3V2C11.25 1.58579 11.5858 1.25 12 1.25Z"
                    fill="black"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.25 12C6.25 8.82436 8.82436 6.25 12 6.25C15.1756 6.25 17.75 8.82436 17.75 12C17.75 15.1756 15.1756 17.75 12 17.75C8.82436 17.75 6.25 15.1756 6.25 12ZM12 7.75C9.65279 7.75 7.75 9.65279 7.75 12C7.75 14.3472 9.65279 16.25 12 16.25C14.3472 16.25 16.25 14.3472 16.25 12C16.25 9.65279 14.3472 7.75 12 7.75Z"
                    fill="black"
                  />
                  <path
                    d="M5.45928 4.39862C5.16638 4.10573 4.69151 4.10573 4.39862 4.39862C4.10572 4.69152 4.10572 5.16639 4.39862 5.45929L5.10572 6.16639C5.39862 6.45929 5.87349 6.45929 6.16638 6.16639C6.45928 5.8735 6.45928 5.39862 6.16638 5.10573L5.45928 4.39862Z"
                    fill="black"
                  />
                  <path
                    d="M22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H21C20.5858 12.75 20.25 12.4142 20.25 12C20.25 11.5858 20.5858 11.25 21 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12Z"
                    fill="black"
                  />
                  <path
                    d="M19.6014 5.45928C19.8943 5.16638 19.8943 4.69151 19.6014 4.39862C19.3085 4.10572 18.8336 4.10572 18.5407 4.39862L17.8336 5.10572C17.5407 5.39862 17.5407 5.87349 17.8336 6.16638C18.1265 6.45928 18.6014 6.45928 18.8943 6.16638L19.6014 5.45928Z"
                    fill="black"
                  />
                  <path
                    d="M12 20.25C12.4142 20.25 12.75 20.5858 12.75 21V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V21C11.25 20.5858 11.5858 20.25 12 20.25Z"
                    fill="black"
                  />
                  <path
                    d="M18.8943 17.8336C18.6014 17.5407 18.1266 17.5407 17.8337 17.8336C17.5408 18.1265 17.5408 18.6014 17.8337 18.8943L18.5408 19.6014C18.8337 19.8943 19.3085 19.8943 19.6014 19.6014C19.8943 19.3085 19.8943 18.8336 19.6014 18.5407L18.8943 17.8336Z"
                    fill="black"
                  />
                  <path
                    d="M3.75 12C3.75 12.4142 3.41421 12.75 3 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H3C3.41421 11.25 3.75 11.5858 3.75 12Z"
                    fill="black"
                  />
                  <path
                    d="M6.16632 18.8943C6.45921 18.6014 6.45921 18.1265 6.16632 17.8336C5.87342 17.5407 5.39855 17.5407 5.10566 17.8336L4.39855 18.5407C4.10566 18.8336 4.10566 19.3085 4.39855 19.6014C4.69144 19.8943 5.16632 19.8943 5.45921 19.6014L6.16632 18.8943Z"
                    fill="black"
                  />
                </svg>
              </button>
            </li>
            <li>
             {/* Icône de la loupe */}
      <button className="searchbarToggle" onClick={handleSearchIconClick}>
      <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.0166 19.3948C23.4992 17.3762 24.375 14.8841 24.375 12.1875C24.375 5.45653 18.9185 0 12.1875 0C5.45653 0 0 5.45653 0 12.1875C0 18.9185 5.45653 24.375 12.1875 24.375C14.8848 24.375 17.3775 23.4987 19.3964 22.0153L19.3948 22.0166C19.4501 22.0915 19.5117 22.1633 19.5796 22.2312L26.7992 29.4508C27.5314 30.1831 28.7186 30.1831 29.4508 29.4508C30.1831 28.7186 30.1831 27.5314 29.4508 26.7992L22.2312 19.5796C22.1633 19.5117 22.0915 19.4501 22.0166 19.3948ZM22.5 12.1875C22.5 17.8829 17.8829 22.5 12.1875 22.5C6.49206 22.5 1.875 17.8829 1.875 12.1875C1.875 6.49206 6.49206 1.875 12.1875 1.875C17.8829 1.875 22.5 6.49206 22.5 12.1875Z" fill="#141414"/>
</svg>
      </button>
      {showSearchBar && (
        <input
        type="text"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder="Rechercher..."
      />
      )}
            </li>
            <li>
              <Link
                href="/"
                className={blogClassList}
                title="Access the home page"
              >
                diatribe<span style={{ color: "var(--themeAccent)" }}>.</span>
              </Link>
              {userRole === "admin" && (
                <ul className="dropdown">
                  <li>
                    <Link
                      href="/create"
                      className="link"
                      title="Create a new blog post for Voyage Stoïque"
                    >
                      nouvel article
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/blog"
                      className="link"
                      title="Access the blog admin panel"
                    >
                      admin
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <span className="navbarSeparator">|</span>
            <li>
              <Link
                href="/agora"
                className={agoraClassList}
                title="Access the agora page"
              >
                agora
                <span style={{ color: "var(--themeAccent)" }}>.</span>
              </Link>
              {userRole === "admin" && (
                <ul className="dropdown">
                  <li>
                    <Link
                      href="/admin/agora"
                      className="link"
                      title="Access the agora admin panel"
                    >
                      admin
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <span className="navbarSeparator">|</span>
            <li>
              <Link
                href={profileLink}
                className={profileClassList}
                title="Access the profile page"
              >
                persona<span style={{ color: "var(--themeAccent)" }}>.</span>
              </Link>
              <ul className="dropdown">
                {isAuthenticated ? (
                  <li>
                    <form onSubmit={handleLogoutSubmit}>
                      <button
                        type="submit"
                        className="link"
                        title="Log out from Voyage Stoïque"
                      >
                        déconnexion
                      </button>
                    </form>
                  </li>
                ) : (
                  <li>
                    <Link
                      href="/login"
                      className="link"
                      title="Log into your account on Voyage Stoïque"
                    >
                      connexion
                    </Link>
                  </li>
                )}
              </ul>
            </li>
            <span className="navbarSeparator">|</span>
            <li>
              <button className="navCTA">
                <Link href="https://donate.stripe.com/test_bIYbJQeQf9Agh2geUU">
                  effectuer une donation.
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div id="readingProgress"></div>
    </header>
  );
}
