"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useGlobalContext } from "./layout/GlobalContext";

export default function Home() {
  const { userToken, isSubscribed, setIsSubscribed, userId, createMarkup, formatDate, apiGateway } =
    useGlobalContext();
    const [article, setArticle] = useState(null);
    const [recentArticles, setRecentArticles] = useState([]);
    const [topArticles, setTopArticles] = useState([]);
    const [author, setAuthor] = useState(null);
    const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [error, setError] = useState("");

  const handleSave = async (event, articleId) => {
    event.preventDefault();

    try {
      const response = await fetch(`${apiGateway}/articles/save/${articleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Une erreur est survenue lors de l'upvote");
      }

      const updatedArticleSave = await response.json();

        setRecommendedArticles((prevRecommendations) =>
          prevRecommendations.map((article) =>
            article._id === articleId
              ? { ...article, savedNumber: updatedArticleSave }
              : article
          )
        );

        setRecentArticles((prevRecommendations) =>
          prevRecommendations.map((article) =>
            article._id === articleId
              ? { ...article, savedNumber: updatedArticleSave }
              : article
          )
        );

        setArticle({ ...article, savedNumber: updatedArticleSave });

      try {
        const response = await fetch(
          `${apiGateway}/auth/saveArticle/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({ savedArticles: articleId }), // Utilisation de articleId ici
          }
        );

        if (!response.ok) {
          throw new Error(
            "Une erreur est survenue lors de la sauvegarde de l'article sur le profil"
          );
        }
      } catch (error) {
        console.error("Erreur lors de l'upvote:", error);
      }
    } catch (error) {
      console.error("Erreur lors de l'upvote:", error);
    }
  };

  const handleSubscribe = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${apiGateway}/auth/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ newsSubscription: true }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'abonnement");
      }
      setIsSubscribed(true);
    } catch (error) {
      console.error("Erreur lors de l'abonnement :", error);
    }
  };

  useEffect(() => {
    const fetchArticleAndAuthor = async () => {
      try {
        const response = await fetch(`${apiGateway}/articles/latest`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const articleData = await response.json();
        setArticle(articleData);

        if (articleData.author) {
          const authorResponse = await fetch(
            `${apiGateway}/auth/${articleData.author}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!authorResponse.ok) {
            throw new Error(`HTTP error! status: ${authorResponse.status}`);
          }

          const userData = await authorResponse.json();
          setAuthor(userData.user.username);
        }
      } catch (error) {
        setError(error.message);
      }

      try {
        const response = await fetch(`${apiGateway}/articles/recent`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const articlesData = await response.json();
        setRecentArticles(articlesData);
      } catch (error) {
        setError(error.message);
      }

      try {
        const response = await fetch(`${apiGateway}/articles/top`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const articlesData = await response.json();
        setTopArticles(articlesData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchArticleAndAuthor();
  }, []);

  useEffect(() => {
    const fetchReco = async () => {
      try {
        const recommendationsResponse = await fetch(
          `${apiGateway}/articles/recommendations/${article._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
  
        // Remplacer 'response' par 'recommendationsResponse'
        if (!recommendationsResponse.ok) {
          throw new Error(
            "Une erreur est survenue lors de la récupération de recommandations d'articles"
          );
        }
  
        const recommendations = await recommendationsResponse.json(); // N'oubliez pas de convertir la réponse en JSON
  
        setRecommendedArticles(recommendations); // Vérifiez si vous devez peut-être traiter recommendations ici
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des recommandations:",
          error
        );
      }
    }
    fetchReco()
  }, [article, userToken])

  return (
    <main>
      {article ? (
        <>
          <div className="hero article">
            <Image
              src={encodeURI(article.cover)}
              width="1728"
              height="1117"
              alt="The article's cover"
            />
            {userToken && <form
              className="saveArticle"
              onSubmit={(event) => handleSave(event, article._id)}
            >
              <button
                type="submit"
                className={`saveButton ${
                  article.savedNumber.includes(userId) ? "active" : ""
                }`}
              >
                {article.savedNumber.includes(userId) ? (
                  <svg
                    alt="Icône d'ajout aux articles enregistrés"
                    width="28"
                    height="38"
                    viewBox="0 0 28 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.25 37.3334V4.10419C0.25 2.20568 1.789 0.666687 3.6875 0.666687H24.3125C26.211 0.666687 27.75 2.20568 27.75 4.10419V37.3334L14 29.3125L0.25 37.3334Z"
                      fill="#141414"
                    />
                  </svg>
                ) : (
                  <svg
                    alt="Icône d'ajout aux articles enregistrés"
                    width="30"
                    height="40"
                    viewBox="0 0 30 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 5C0 2.23858 2.23858 0 5 0H25C27.7614 0 30 2.23858 30 5V38.75C30 39.211 29.7463 39.6346 29.3398 39.8521C28.9334 40.0696 28.4402 40.0458 28.0566 39.7901L15 32.7523L1.94338 39.7901C1.5598 40.0458 1.06662 40.0696 0.660178 39.8521C0.253731 39.6346 0 39.211 0 38.75V5ZM5 2.5C3.61929 2.5 2.5 3.61929 2.5 5V36.4144L14.3066 30.2099C14.7265 29.93 15.2735 29.93 15.6934 30.2099L27.5 36.4144V5C27.5 3.61929 26.3807 2.5 25 2.5H5Z"
                      fill="#141414"
                    />
                  </svg>
                )}
              </button>
            </form>}
            
            <div className="searchData">
              <span className="articleCategory">{article.category}</span> |{" "}
              {article.keywords?.length > 0
                ? article.keywords.map((keyword, index) => (
                    <span key={index} className="keyword">
                      {keyword}
                    </span>
                  ))
                : null}
            </div>
            <div className="twinCol">
              <div className="articleInfo">
                <h2>
                  {article.title}
                  <span style={{ color: "var(--themeAccent)" }}>.</span>
                </h2>
                <div
                  className="articleIntro"
                  dangerouslySetInnerHTML={createMarkup(article.intro)} // Injecter du HTML nettoyé
                />
                <div className="articleMetadatas">
                  <div className="firstLine">
                    <p>{formatDate(article.publishDate)}</p> •{" "}
                    <Link href={`/profile/${author}`}>{author}</Link> •{" "}
                    <p>
                      Lecture de {article.readingTime}{" "}
                      {article.readingTime <= 1 ? "minute" : "minutes"}
                    </p>
                  </div>
                  <div className="secondLine">
                  <Link className="simpler" href={`/${article.slug}`}>lire l&apos;article.</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content fit articleCore">
            <div className="listings">
                  <div className="listing">
                    <h2>nos articles les plus récents<span style={{ color: "var(--themeAccent)" }}>.</span></h2>
                    <div className="articleCardsContainer">
                      {recentArticles.length > 0 ? (
                  recentArticles.map((article) => (
                    <div key={article._id} className="articleCard">
                      
                      <Image
                        src={article.cover}
                        width="300"
                        height="150"
                        alt="The article's cover"
                      />
                      {userToken && <form
                        className="saveArticle"
                        onSubmit={(event) => handleSave(event, article._id)}
                      >
                        <button
                          type="submit"
                          className={`saveButton ${
                            article.savedNumber.includes(userId) ? "active" : ""
                          }`}
                        >
                          {article.savedNumber.includes(userId) ? (
                            <svg
                              alt="Icône d'ajout aux articles enregistrés"
                              width="28"
                              height="38"
                              viewBox="0 0 28 38"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0.25 37.3334V4.10419C0.25 2.20568 1.789 0.666687 3.6875 0.666687H24.3125C26.211 0.666687 27.75 2.20568 27.75 4.10419V37.3334L14 29.3125L0.25 37.3334Z"
                                fill="#141414"
                              />
                            </svg>
                          ) : (
                            <svg
                              alt="Icône d'ajout aux articles enregistrés"
                              width="30"
                              height="40"
                              viewBox="0 0 30 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0 5C0 2.23858 2.23858 0 5 0H25C27.7614 0 30 2.23858 30 5V38.75C30 39.211 29.7463 39.6346 29.3398 39.8521C28.9334 40.0696 28.4402 40.0458 28.0566 39.7901L15 32.7523L1.94338 39.7901C1.5598 40.0458 1.06662 40.0696 0.660178 39.8521C0.253731 39.6346 0 39.211 0 38.75V5ZM5 2.5C3.61929 2.5 2.5 3.61929 2.5 5V36.4144L14.3066 30.2099C14.7265 29.93 15.2735 29.93 15.6934 30.2099L27.5 36.4144V5C27.5 3.61929 26.3807 2.5 25 2.5H5Z"
                                fill="#141414"
                              />
                            </svg>
                          )}
                        </button>
                      </form>}
                      
                      <Link title="Accédez à l'article" href={`/${article.slug}`}>
                      <div className="articleMainInfo">
                      <span className="articleCategory">{article.category}</span>
                        <h3>{article.title}
                        <span style={{ color: "var(--themeAccent)" }}>.</span></h3>
                      <div className="intro" dangerouslySetInnerHTML={createMarkup(article.intro)}/>
                      <div className="articleMainData">
                        <p>{formatDate(article.publishDate)}</p> •{" "}
                        <Link href={`/profile/${author}`}>
                          {author}
                        </Link>
                      </div>
                      <Link className="simpler" href={`/${article.slug}`}>
                        lire l&apos;article.
                      </Link>
                      </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <p>Aucun article pour l&apos;instant.</p>
                )}
                    </div>
                  
                  </div>
                  <div className="listing">
                    <h2>nos articles les plus populaires<span style={{ color: "var(--themeAccent)" }}>.</span></h2>
                    <div className="articleCardsContainer popular">
                      {topArticles.length > 0 ? (
                  topArticles.map((article) => (
                    <div key={article._id} className="articleCard">
                      
                      <Image
                        src={article.cover}
                        width="300"
                        height="150"
                        alt="The article's cover"
                      />
                      {userToken && <form
                        className="saveArticle"
                        onSubmit={(event) => handleSave(event, article._id)}
                      >
                        <button
                          type="submit"
                          className={`saveButton ${
                            article.savedNumber.includes(userId) ? "active" : ""
                          }`}
                        >
                          {article.savedNumber.includes(userId) ? (
                            <svg
                              alt="Icône d'ajout aux articles enregistrés"
                              width="28"
                              height="38"
                              viewBox="0 0 28 38"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0.25 37.3334V4.10419C0.25 2.20568 1.789 0.666687 3.6875 0.666687H24.3125C26.211 0.666687 27.75 2.20568 27.75 4.10419V37.3334L14 29.3125L0.25 37.3334Z"
                                fill="#141414"
                              />
                            </svg>
                          ) : (
                            <svg
                              alt="Icône d'ajout aux articles enregistrés"
                              width="30"
                              height="40"
                              viewBox="0 0 30 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0 5C0 2.23858 2.23858 0 5 0H25C27.7614 0 30 2.23858 30 5V38.75C30 39.211 29.7463 39.6346 29.3398 39.8521C28.9334 40.0696 28.4402 40.0458 28.0566 39.7901L15 32.7523L1.94338 39.7901C1.5598 40.0458 1.06662 40.0696 0.660178 39.8521C0.253731 39.6346 0 39.211 0 38.75V5ZM5 2.5C3.61929 2.5 2.5 3.61929 2.5 5V36.4144L14.3066 30.2099C14.7265 29.93 15.2735 29.93 15.6934 30.2099L27.5 36.4144V5C27.5 3.61929 26.3807 2.5 25 2.5H5Z"
                                fill="#141414"
                              />
                            </svg>
                          )}
                        </button>
                      </form>}
                      
                      <Link title="Accédez à l'article" href={`/${article.slug}`}>
                      <div className="articleMainInfo">
                      <span className="articleCategory">{article.category}</span>
                        <h3>{article.title}
                        <span style={{ color: "var(--themeAccent)" }}>.</span></h3>
                      <div className="intro" dangerouslySetInnerHTML={createMarkup(article.intro)}/>
                      <div className="articleMainData">
                        <p>{formatDate(article.publishDate)}</p> •{" "}
                        <Link href={`/profile/${author}`}>
                          {author}
                        </Link>
                      </div>
                      <Link className="simpler" href={`/${article.slug}`}>
                        lire l&apos;article.
                      </Link>
                      </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <p>Aucun article pour l&apos;instant.</p>
                )}
                    </div>
                  
                  </div>
            </div>
            <div className="articleAside">
              <div className="follow">
                <h3>
                  suivez-nous
                  <span style={{ color: "var(--themeAccent)" }}>.</span>
                </h3>
                <div className="socialMediaIcons">
                  <Link
                    href="https://discord.gg/URGXAVbPYj"
                    title="Join our Discord server"
                  >
                    <svg
                      alt="Discord logo"
                      width="52"
                      height="60"
                      viewBox="0 0 52 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M34.7917 28.5417C34.7917 30.3209 33.4792 31.7792 31.8167 31.7792C30.1834 31.7792 28.8417 30.3209 28.8417 28.5417C28.8417 26.7625 30.1542 25.3042 31.8167 25.3042C33.4792 25.3042 34.7917 26.7625 34.7917 28.5417ZM21.1709 25.3042C19.5084 25.3042 18.1959 26.7625 18.1959 28.5417C18.1959 30.3209 19.5375 31.7792 21.1709 31.7792C22.8334 31.7792 24.1459 30.3209 24.1459 28.5417C24.175 26.7625 22.8334 25.3042 21.1709 25.3042ZM51.9709 6.84171V59.1667C44.6229 52.6732 46.9729 54.8227 38.4375 46.8875L39.9834 52.2834H6.90837C3.61253 52.2834 0.929199 49.6 0.929199 46.275V6.84171C0.929199 3.51671 3.61253 0.833374 6.90837 0.833374H45.9917C49.2875 0.833374 51.9709 3.51671 51.9709 6.84171ZM43.6584 34.4917C43.6584 25.1 39.4584 17.4875 39.4584 17.4875C35.2584 14.3375 31.2625 14.425 31.2625 14.425L30.8542 14.8917C35.8125 16.4084 38.1167 18.5959 38.1167 18.5959C31.1884 14.7986 23.0498 14.7979 16.3292 17.75C15.25 18.2459 14.6084 18.5959 14.6084 18.5959C14.6084 18.5959 17.0292 16.2917 22.2792 14.775L21.9875 14.425C21.9875 14.425 17.9917 14.3375 13.7917 17.4875C13.7917 17.4875 9.5917 25.1 9.5917 34.4917C9.5917 34.4917 12.0417 38.7209 18.4875 38.925C18.4875 38.925 19.5667 37.6125 20.4417 36.5042C16.7375 35.3959 15.3375 33.0625 15.3375 33.0625C15.7666 33.3629 16.4741 33.7522 16.5334 33.7917C21.4564 36.5486 28.4493 37.4519 34.7334 34.8125C35.7542 34.4334 36.8917 33.8792 38.0875 33.0917C38.0875 33.0917 36.6292 35.4834 32.8084 36.5625C33.6834 37.6709 34.7334 38.925 34.7334 38.925C41.1792 38.7209 43.6584 34.4917 43.6584 34.4917V34.4917Z"
                        fill="#141414"
                      />
                    </svg>
                  </Link>
                  |{" "}
                  <Link
                    id="InstagramSocials"
                    href="https://www.instagram.com/voyage_stoique/profilecard/?igsh=MWV4bGNueWF1enczcQ=="
                    title="Follow our Instagram"
                  >
                    <svg
                      alt="Instagram logo"
                      width="56"
                      height="56"
                      viewBox="0 0 56 56"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M39.6665 13.4166C39.6665 11.8058 40.9723 10.5 42.5832 10.5C44.194 10.5 45.4998 11.8058 45.4998 13.4166C45.4998 15.0275 44.194 16.3333 42.5832 16.3333C40.9723 16.3333 39.6665 15.0275 39.6665 13.4166Z"
                        fill="#141414"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M27.9998 14.1458C20.3484 14.1458 14.1457 20.3485 14.1457 28C14.1457 35.6514 20.3484 41.8541 27.9998 41.8541C35.6513 41.8541 41.854 35.6514 41.854 28C41.854 20.3485 35.6513 14.1458 27.9998 14.1458ZM18.5207 28C18.5207 22.7648 22.7646 18.5208 27.9998 18.5208C33.235 18.5208 37.479 22.7648 37.479 28C37.479 33.2352 33.235 37.4791 27.9998 37.4791C22.7646 37.4791 18.5207 33.2352 18.5207 28Z"
                        fill="#141414"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M43.3364 1.26293C33.2256 0.132896 22.7742 0.132896 12.6633 1.26293C6.79484 1.91882 2.0572 6.54177 1.36725 12.4408C0.158182 22.7783 0.158182 33.2216 1.36725 43.5591C2.0572 49.4582 6.79484 54.0811 12.6633 54.737C22.7742 55.867 33.2256 55.867 43.3364 54.737C49.2049 54.0811 53.9426 49.4582 54.6325 43.5591C55.8416 33.2216 55.8416 22.7783 54.6325 12.4408C53.9426 6.54177 49.2049 1.91882 43.3364 1.26293ZM13.1493 5.61086C22.9372 4.51692 33.0626 4.51692 42.8505 5.61086C46.73 6.04445 49.8376 9.10582 50.2871 12.949C51.4567 22.9489 51.4567 33.051 50.2871 43.0509C49.8376 46.8941 46.73 49.9555 42.8505 50.3891C33.0626 51.483 22.9372 51.483 13.1493 50.3891C9.2698 49.9555 6.16213 46.8941 5.71263 43.0509C4.54306 33.051 4.54306 22.9489 5.71263 12.949C6.16213 9.10582 9.2698 6.04445 13.1493 5.61086Z"
                        fill="#141414"
                      />
                    </svg>
                  </Link>
                </div>
                {!isSubscribed && userToken ? (
                  <div className="newsSubscription">
                    <h3>
                      Abonnez-vous à notre newsletter
                      <span style={{ color: "var(--themeAccent)" }}>.</span>
                    </h3>
                    <form onSubmit={handleSubscribe}>
                      <button className="simpler" type="submit">
                        Je m&apos;abonne !{" "}
                        <svg
                          alt="Arrow"
                          className="ctaArrow"
                          width="79"
                          height="30"
                          viewBox="0 0 79 37"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M77.5815 20.3378C78.5578 19.3615 78.5578 17.7786 77.5815 16.8023L61.6716 0.892399C60.6953 -0.0839119 59.1124 -0.0839119 58.1361 0.892399C57.1597 1.86871 57.1597 3.45162 58.1361 4.42793L72.2782 18.5701L58.1361 32.7122C57.1597 33.6885 57.1597 35.2714 58.1361 36.2477C59.1124 37.224 60.6953 37.224 61.6716 36.2477L77.5815 20.3378ZM0.813721 21.0701H75.8137V16.0701H0.813721V21.0701Z"
                            fill="#F9F9F9"
                          ></path>
                        </svg>
                      </button>
                    </form>
                  </div>
                ) : (
                  <p>
                    {userToken ? 'Vous êtes inscrit à nos newsletters ! Merci de votre engagement !' : ''}
                  </p>
                )}
              </div>
              <div className="reco">
                <h3>
                  articles recommandés
                  <span style={{ color: "var(--themeAccent)" }}>.</span>
                </h3>
                <div className="articleList">
                  {recommendedArticles.length > 0 ? (
                  recommendedArticles.map((article) => (
                    <div key={article._id} className="articleCard">
                      <Image
                        src={article.cover}
                        width="300"
                        height="150"
                        alt="The article's cover"
                      />
                      {userToken && <form
                        className="saveArticle"
                        onSubmit={(event) => handleSave(event, article._id)}
                      >
                        <button
                          type="submit"
                          className={`saveButton ${
                            article.savedNumber.includes(userId) ? "active" : ""
                          }`}
                        >
                          {article.savedNumber.includes(userId) ? (
                            <svg
                              alt="Icône d'ajout aux articles enregistrés"
                              width="28"
                              height="38"
                              viewBox="0 0 28 38"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0.25 37.3334V4.10419C0.25 2.20568 1.789 0.666687 3.6875 0.666687H24.3125C26.211 0.666687 27.75 2.20568 27.75 4.10419V37.3334L14 29.3125L0.25 37.3334Z"
                                fill="#141414"
                              />
                            </svg>
                          ) : (
                            <svg
                              alt="Icône d'ajout aux articles enregistrés"
                              width="30"
                              height="40"
                              viewBox="0 0 30 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0 5C0 2.23858 2.23858 0 5 0H25C27.7614 0 30 2.23858 30 5V38.75C30 39.211 29.7463 39.6346 29.3398 39.8521C28.9334 40.0696 28.4402 40.0458 28.0566 39.7901L15 32.7523L1.94338 39.7901C1.5598 40.0458 1.06662 40.0696 0.660178 39.8521C0.253731 39.6346 0 39.211 0 38.75V5ZM5 2.5C3.61929 2.5 2.5 3.61929 2.5 5V36.4144L14.3066 30.2099C14.7265 29.93 15.2735 29.93 15.6934 30.2099L27.5 36.4144V5C27.5 3.61929 26.3807 2.5 25 2.5H5Z"
                                fill="#141414"
                              />
                            </svg>
                          )}
                        </button>
                      </form>}
                      <div className="articleMainInfo">
                      <span className="articleCategory">{article.category}</span>
                        <h3>{article.title}
                        <span style={{ color: "var(--themeAccent)" }}>.</span></h3>
                      <div className="intro" dangerouslySetInnerHTML={createMarkup(article.intro)}/>
                      <div className="articleMainData">
                        <p>{formatDate(article.publishDate)}</p> •{" "}
                        <Link href={`/profile/${author}`}>
                          {author}
                        </Link>
                      </div>
                      <Link className="simpler" href={`/${article.slug}`}>
                        lire l&apos;article.
                      </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Aucune recommandation pour l&apos;instant.</p>
                )}
                </div>
                
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Chargement du contenu...</p>
      )}
    </main>
  );
}