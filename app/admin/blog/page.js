"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../../layout/GlobalContext";

export default function BlogAdmin() {
  const { isAuthenticated, userRole, userToken, formatDate, apiGateway } =
    useGlobalContext();
  const [articles, setArticles] = useState([]);
  const [deleting, setDeleting] = useState(null);
  const [deletedArticle, setDeletedArticle] = useState(null);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || userRole !== "admin") {
      router.push("/");
      return;
    }

    const fetchArticles = async () => {
      try {
        const response = await fetch(`${apiGateway}/articles/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const articleData = await response.json();
        setArticles(articleData);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchArticles();
  }, [userToken]);

  const deleteFileFromCloudinary = async (fileUrl, resourceType) => {
    try {
      const response = await fetch(`${apiGateway}/articles/deleteArticleFile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ fileUrl, resourceType }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = await response.json();
    } catch (error) {
      console.error(
        "Erreur lors de la suppression du fichier :",
        error.message
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated || userRole !== "admin") {
      setError("Vous n'êtes pas autorisé à supprimer un article");
      return;
    }
    const articleId = e.target.articleId.value;
    const articleComments = e.target.articleComments.value;
    const articleCover = e.target.articleCover.value;
    const articleAudio = e.target.articleAudio.value;
    const articleUpvotes = e.target.articleUpvotes.value;
    const articleSaved = e.target.articleSaved.value;
    const articleReads = e.target.articleReads.value;
    const userIds = [
      ...new Set([
        ...articleUpvotes.split(","),
        ...articleSaved.split(","),
        ...articleReads.split(","),
      ])
    ].join(",");

    await deleteFileFromCloudinary(articleCover, "image");
    await deleteFileFromCloudinary(articleAudio, "video");

    try {
      const response = await fetch(`${apiGateway}/articles/${articleId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      setArticles((prevArticles) =>
        prevArticles.filter((a) => a._id !== articleId)
      );
    } catch (error) {
      setError(error.message);
    }
    
    try {
      const response = await fetch(
        `${apiGateway}/comments/by-ids?ids=${articleComments}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      setError(error.message);
    }

    try {
      const updateResponse = await fetch(
        `${apiGateway}/auth/removeArticleByIds?ids=${userIds}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            articleId: articleId
          })
        }
      );

      if (!updateResponse.ok) {
        throw new Error(`Erreur lors de la mise à jour des utilisateurs : ${updateResponse.status}`);
      }

      console.log("Article supprimé et utilisateurs mis à jour avec succès.");
    } catch (error) {
      setError(error.message);
    }
    finally {
      setDeleting(null);
      setLoading(false);
    }
  };

  return (
    <main className="admin">
      {loading && "Requête en cours... Mise à jour du contenu."}
      <h2>
        Administrer le blog
        <span style={{ color: "var(--themeAccent)" }}>.</span>
      </h2>
      <div className="adminListing">
        <p>
          {articles.length} article{articles.length > 1 && "s"}
        </p>
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article._id} className="articleLine">
              <div className="info">
                <span className="articleCategory">{article.category}</span>
                <h3>
                  {article.title}
                  <span style={{ color: "var(--themeAccent)" }}>.</span>
                </h3>
                <div className="articleMainData">
                  <p>{formatDate(article.publishDate)}</p>
                </div>
              </div>
              {userToken && (
                <div className="actions">
                  <Link className="simpler" href={`/edit/${article._id}`}>
                    modifier l&apos;article.
                  </Link>
                  {deleting === null && (
                    <button
                      onClick={() => setDeleting(article._id)}
                      className="simpler danger"
                    >
                      supprimer l&apos;article.
                    </button>
                  )}
                  {deleting === article._id && (
                    <button
                      className="screenBlock"
                      onClick={() => setDeleting(null)}
                    ></button>
                  )}
                  {deleting === article._id && (
                    <form onSubmit={handleSubmit} className="popup">
                      <label>
                        Vous vous apprêtez à supprimer l&apos;article &quot;
                        <b>{article.title}</b>&quot;, êtes-vous sûr de vouloir
                        poursuivre ?<br />
                        <b>Cette action est irréversible.</b>
                      </label>
                      <input
                        type="text"
                        name="articleId"
                        value={article._id}
                        hidden
                        readOnly
                      />
                      <input
                        type="text"
                        name="articleComments"
                        value={article.comments.join(",")}
                        hidden
                        readOnly
                      />
                      <input
                        type="text"
                        name="articleCover"
                        value={article.cover}
                        hidden
                        readOnly
                      />
                      <input
                        type="text"
                        name="articleAudio"
                        value={article.audio}
                        hidden
                        readOnly
                      />
                      <input
                        type="text"
                        name="articleUpvotes"
                        value={article.upvotes}
                        hidden
                        readOnly
                      />
                      <input
                        type="text"
                        name="articleSaved"
                        value={article.savedNumber}
                        hidden
                        readOnly
                      />
                      <input
                        type="text"
                        name="articleReads"
                        value={article.reads}
                        hidden
                        readOnly
                      />
                      <div className="choices">
                        <button type="submit" className="simpler danger">
                          Supprimer l&apos;article.
                        </button>
                        <button
                          type="button"
                          className="simpler"
                          onClick={() => setDeleting(null)}
                        >
                          Annuler
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Aucun article pour l&apos;instant.</p>
        )}
      </div>
    </main>
  );
}
