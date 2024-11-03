"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGlobalContext } from "../layout/GlobalContext";

export default function SearchPage() {
  const { query, apiGateway, userToken, userId, createMarkup, formatDate} = useGlobalContext();
  const [results, setResults] = useState([]);
  const [resultsPosts, setResultsPosts] = useState([]);
  const [loadMore1, setLoadMore1] = useState(false);
  const [loadMore2, setLoadMore2] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      if (query) {
        try {
          const response = await fetch(`${apiGateway}/articles/search?q=${query}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
          
          if (!response.ok) {
            throw new Error(`Erreur de recherche: ${response.status}`);
          }

          const data = await response.json();
          setResults(data); 
        } catch (error) {
          console.error("Erreur lors de la recherche des articles :", error);
          setError(error.message);
        }
        try {
          const response = await fetch(`${apiGateway}/posts/search?q=${query}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
          
          if (!response.ok) {
            throw new Error(`Erreur de recherche: ${response.status}`);
          }

          const data = await response.json();
          setResultsPosts(data); 
        } catch (error) {
          console.error("Erreur lors de la recherche des articles :", error);
          setError(error.message);
        }
      }
    };

    fetchArticles();
  }, [query]);

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


      setResults((prevResults) =>
          prevResults.map((article) =>
            article._id === articleId
              ? { ...article, savedNumber: updatedArticleSave }
              : article
          )
        );

      try {
        const response = await fetch(
          `${apiGateway}/auth/saveArticle/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({ savedArticles: articleId }),
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

  const handleSavePost = async (event, articleId) => {
    event.preventDefault();

    try {
      const response = await fetch(`${apiGateway}/posts/save/${articleId}`, {
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


      setResultsPosts((prevResults) =>
          prevResults.map((article) =>
            article._id === articleId
              ? { ...article, savedNumber: updatedArticleSave }
              : article
          )
        );

      try {
        const response = await fetch(
          `${apiGateway}/auth/savePost/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({ savedArticles: articleId }),
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

  return (
    <main className="searchResults">
      <p>{results.length + resultsPosts.length} résultats trouvés pour votre recherche &quot;{query}&quot;</p>
      <div className="articles">
        <h2>
          {results.length === 0
  ? "aucun article trouvé"
  : results.length === 1
  ? "1 article trouvé"
  : `${results.length} articles trouvés`}
          <span style={{ color: "var(--themeAccent)" }}>.</span>
        </h2>
        <div className={`articleList ${loadMore1 ? "active" : ""}`}>
          {results.length > 0 ? (
            results.map((article) => (
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
                </form>
                }
                <div className="articleMainInfo">
                  <span className="articleCategory">{article.category}</span>
                  <h3>
                    {article.title}
                    <span style={{ color: "var(--themeAccent)" }}>.</span>
                  </h3>
                  {article.intro && (
                    <div
                      className="intro"
                      dangerouslySetInnerHTML={createMarkup(article.intro)}
                    />
                  )}
                  <div className="articleMainData">
                    <p>{formatDate(article.publishDate)}</p>
                  </div>
                  <Link className="simpler" href={`/${article._id}`}>Lire l&apos;article.</Link>
                </div>
              </div>
            ))
          ) : (
            <p>Aucune publication pour l&apos;instant.</p>
          )}
        </div>
        {results.length > 6 && (
          <button className={`simpler ${loadMore1 ? "active" : ""}`} onClick={() => setLoadMore1(true)}>
            voir toute la liste.
          </button>
        )}
      </div>
      <div className="articles">
        <h2>
          {resultsPosts.length === 0
  ? "aucun post trouvé"
  : resultsPosts.length === 1
  ? "1 post trouvé"
  : `${resultsPosts.length} posts trouvés`}
          <span style={{ color: "var(--themeAccent)" }}>.</span>
        </h2>
        <div className={`articleList ${loadMore1 ? "active" : ""}`}>
          {resultsPosts.length > 0 ? (
            resultsPosts.map((article) => (
              <div key={article._id} className="articleCard">
                {article.cover && <Image
                  src={article.cover}
                  width="300"
                  height="150"
                  alt="The article's cover"
                />
                }
                {userToken && <form
                  className="saveArticle"
                  onSubmit={(event) => handleSavePost(event, article._id)}
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
                </form>
                }
                <div className="articleMainInfo">
                  <span className="articleCategory">{article.category}</span>
                  <h3>
                    {article.title}
                    <span style={{ color: "var(--themeAccent)" }}>.</span>
                  </h3>
                  {article.content && (
                    <div
                      className="postIntro"
                      dangerouslySetInnerHTML={createMarkup(article.content)}
                    />
                  )}
                  <div className="articleMainData">
                    <p>{formatDate(article.publishDate)}</p>
                  </div>
                  <Link className="simpler" href={`/agora/${article._id}`}>Lire le post.</Link>
                </div>
              </div>
            ))
          ) : (
            <p>Aucune publication pour l&apos;instant.</p>
          )}
        </div>
        {resultsPosts.length > 6 && (
          <button className={`simpler ${loadMore2 ? "active" : ""}`} onClick={() => setLoadMore2(true)}>
            voir toute la liste.
          </button>
        )}
      </div>
    </main>
  );
}