"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../layout/GlobalContext";
import DOMPurify from "dompurify"; // Importer DOMPurify

const apiGateway = process.env.NEXT_PUBLIC_API_GATEWAY_URI;

export default function ViewArticle({ params }) {
  const { userToken, isSubscribed, setIsSubscribed, userId, userUsername } =
    useGlobalContext();
  const { id } = params;
  const [article, setArticle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comments, setComments] = useState([]);
  const [headings, setHeadings] = useState([]);
  const [error, setError] = useState("");
  const [commentsTree, setCommentsTree] = useState([]);

  const createMarkup = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const extractHeadings = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    // Sélectionne tous les h2 et h3 avec un ID
    const headingElements = Array.from(doc.querySelectorAll("h2[id], h3[id]"));

    // Vérifie si des headings ont été trouvés
    if (headingElements.length === 0) {
      console.warn("Aucun heading trouvé dans le contenu.");
      return;
    }

    // Crée un tableau de liens en utilisant les IDs existants
    const allHeadings = headingElements.map((heading) => {
      const headingId = heading.id; // Récupère l'ID existant
      const headingText = heading.innerText; // Récupère le texte du heading
      const headingLevel = heading.tagName.toLowerCase(); // Récupère le tag (h2 ou h3)

      return {
        id: headingId,
        content: headingText,
        level: headingLevel,
      };
    });

    // Met à jour l'état avec les nouveaux éléments de lien
    setHeadings(allHeadings);
  };

  const handleUpvote = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${apiGateway}/articles/upvote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Une erreur est survenue lors de l'upvote");
      }

      const updatedArticleUpvotes = await response.json();

      setArticle((prevArticle) => ({
        ...prevArticle,
        upvotes: updatedArticleUpvotes,
      }));

      try {
        const response = await fetch(`${apiGateway}/auth/upvoteArticle/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({ upvotedArticles: id }),
        });
  
        if (!response.ok) {
          throw new Error("Une erreur est survenue lors de l'upvote de l'article sur le profil");
        }
      } catch (error) {
        console.error("Erreur lors de l'upvote:", error);
      }
    } catch (error) {
      console.error("Erreur lors de l'upvote:", error);
    }
  };
  
  const handleCommentUpvote = async (event, commentId) => {
    event.preventDefault();
  
    try {
      const response = await fetch(`${apiGateway}/comments/upvote/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Une erreur est survenue lors de l'upvote");
      }
  
      const updatedUpvotes = await response.json(); // La réponse ici devrait être la liste des upvotes
  
      setComments((prevComments) => {
        return prevComments.map((comment) =>
          comment._id === commentId
            ? { ...comment, upvotes: updatedUpvotes } // Met à jour le tableau des upvotes
            : comment
        );
      });
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

  const handleSave = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${apiGateway}/articles/save/${id}`, {
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

      setArticle((prevArticle) => ({
        ...prevArticle,
        savedNumber: updatedArticleSave,
      }));

      try {
        const response = await fetch(`${apiGateway}/auth/saveArticle/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({ savedArticles: id }),
        });
  
        if (!response.ok) {
          throw new Error("Une erreur est survenue lors de la sauvegarde de l'article sur le profil");
        }
      } catch (error) {
        console.error("Erreur lors de l'upvote:", error);
      }
    } catch (error) {
      console.error("Erreur lors de l'upvote:", error);
    }
  };

  const handleComment = async (event) => {
    event.preventDefault();

    let commentContent = event.target.content.value;

    let formattedContent = commentContent.replace(/\n/g, "<br/>");
    formattedContent = formattedContent.replace(
      /\*\*\*(.+?)\*\*\*/g,
      "<strong><em>$1</em></strong>"
    );
    formattedContent = formattedContent.replace(
      /\*\*(.+?)\*\*/g,
      "<strong>$1</strong>"
    );
    formattedContent = formattedContent.replace(/\*(.+?)\*/g, "<em>$1</em>");
    formattedContent = `<p>${formattedContent}</p>`;

    const parentCommentId = event.target.parentId.value || null;

    const commentData = {
      author: userId,
      authorUsername: userUsername,
      content: formattedContent,
      parentComment: parentCommentId,
    };

    try {
      // Envoi du nouveau commentaire
      const response = await fetch(`${apiGateway}/comments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du commentaire");
      }

      const createdComment = await response.json(); // Récupération du commentaire créé

      setComments((prevComments) => [...prevComments, createdComment]);

      // Mise à jour de l'article avec le nouvel ID de commentaire
      const articleResponse = await fetch(
        `${apiGateway}/articles/comment/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({ commentId: createdComment._id }), // Utilisation de l'ID du commentaire créé
        }
      );

      if (!articleResponse.ok) {
        throw new Error("Erreur lors de l'envoi du commentaire dans l'article");
      }

      const updatedArticleComments = await articleResponse.json();

      setArticle((prevArticle) => ({
        ...prevArticle,
        comments: updatedArticleComments,
      }));
    } catch (error) {
      console.error("Erreur lors de l'envoi du commentaire :", error);
    }
  };

  const buildCommentTree = (comments) => {
    if (!comments || !Array.isArray(comments)) {
      console.error("Comments is not an array:", comments);
      return []; // Retourne un tableau vide si comments n'est pas valide
    }
    
    const commentMap = {};
    const tree = [];
  
    comments.forEach((comment) => {
      commentMap[comment._id] = { ...comment, children: [] };
    });
  
    comments.forEach((comment) => {
      if (comment.parentComment) {
        if (commentMap[comment.parentComment]) {
          commentMap[comment.parentComment].children.push(commentMap[comment._id]);
        }
      } else {
        tree.push(commentMap[comment._id]);
      }
    });
  
    return tree;
  };

  const renderComments = (comments) => {
    return comments.map((comment) => (
      <div key={comment._id} className="comment">
        <div className="commentUpvotes">
        <form onSubmit={(event) => handleCommentUpvote(event, comment._id)}>
                      <button
                        type="submit"
                        className={`upvoteButton ${
                          comment.upvotes.includes(userId) ? "active" : ""
                        }`}
                      >
                        <svg width="46" height="47" viewBox="0 0 46 47" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.1213 1.67848C23.9497 0.506912 22.0503 0.506911 20.8787 1.67848L1.7868 20.7704C0.615223 21.9419 0.615223 23.8414 1.7868 25.013C2.95837 26.1846 4.85786 26.1846 6.02944 25.013L23 8.04245L39.9706 25.013C41.1421 26.1846 43.0416 26.1846 44.2132 25.013C45.3848 23.8414 45.3848 21.9419 44.2132 20.7704L25.1213 1.67848ZM20 43.7998C20 45.4567 21.3431 46.7998 23 46.7998C24.6569 46.7998 26 45.4567 26 43.7998L20 43.7998ZM20 3.7998L20 43.7998L26 43.7998L26 3.7998L20 3.7998Z" fill="#B0ABED"/>
</svg>
                      </button>
                    </form>
<p>{comment.upvotes && comment.upvotes.length > 0 ? comment.upvotes.length : 0}</p>
        </div>
        <div className="commentContent">
        <p>
          <Link href={`/profile/${comment.author}`}>{comment.authorUsername}</Link> • {new Date(comment.publishDate).toLocaleDateString()}
          {comment.publishDate !== comment.lastModifiedDate
            ? ` (Modifié le : ${new Date(comment.lastModifiedDate).toLocaleDateString()})`
            : ""}
        </p>
        <div dangerouslySetInnerHTML={createMarkup(comment.content)}></div>
        {comment.parentComment === null ? <form onSubmit={handleComment} className="commentOnTheArticle">
                  <textarea
                    name="content"
                    placeholder="Écrivez votre réponse ici..."
                  ></textarea>
                  <input name="parentId" type="hidden" value={comment._id} />
                  <button type="submit" className="simpler">
                    Envoyer
                  </button>
                </form> : <form onSubmit={handleComment} className="commentOnTheArticle">
                  <textarea
                    name="content"
                    placeholder="Écrivez votre réponse ici..."
                  ></textarea>
                  <input name="parentId" type="hidden" value={comment.parentComment} />
                  <button type="submit" className="simpler">
                    Envoyer
                  </button>
                </form>}
        
        {comment.children && comment.children.length > 0 && (
          <div className="childrenComments">
            {renderComments(comment.children)}
          </div>
        )}
        </div>
      </div>
    ));
  };

  useEffect(() => {
    if (!userToken) {
      return; // Sortir si pas de token
    }

    const fetchArticleAndAuthor = async () => {
      try {
        const response = await fetch(`${apiGateway}/articles/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const articleData = await response.json();
        setArticle(articleData);

        try {
          const response = await fetch(`${apiGateway}/auth/articlesHistory/${userId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({ articlesHistory: id }),
          });
    
          if (!response.ok) {
            throw new Error("Une erreur est survenue lors de l'upvote de l'article sur le profil");
          }
        } catch (error) {
          console.error("Erreur lors de l'upvote:", error);
        }

        // Récupérer les commentaires en fonction des IDs
        if (articleData.comments && articleData.comments.length > 0) {
          const commentsResponse = await fetch(
            `${apiGateway}/comments/by-ids?ids=${articleData.comments.join(
              ","
            )}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
              },
            }
          );

          if (!commentsResponse.ok) {
            throw new Error(`HTTP error! status: ${commentsResponse.status}`);
          }

          const commentsData = await commentsResponse.json();

          setComments(commentsData);
          setCommentsTree(buildCommentTree(commentsData));
        }

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

        // Extraire les h2 et h3
        extractHeadings(articleData.content);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchArticleAndAuthor();
  }, [id, userToken]);

  useEffect(() => {
    if (article) {
      const isUpvoted = article.upvotes.includes(userId);
      // Si nécessaire, d'autres effets peuvent être ajoutés ici
    }
  }, [article, userId]);

  useEffect(() => {
    if (comments && Array.isArray(comments)) {
      const newCommentsTree = buildCommentTree(comments);
      setCommentsTree(newCommentsTree);
    } else {
      setCommentsTree([]); // Si "comments" n'est pas valide, réinitialise le tree
    }
  }, [comments]);

  return (
    <main>
      {error && <p>{error}</p>}
      {article ? (
        <>
          <div className="hero article">
            <Image
              src={encodeURI(article.cover)}
              width="1728"
              height="1117"
              alt="The article's cover"
            />
            <form className="saveArticle" onSubmit={handleSave}>
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
                    <Link href={`/profile/${article.author}`}>{author}</Link> •{" "}
                    <p>
                      Lecture de {article.readingTime}{" "}
                      {article.readingTime <= 1 ? "minute" : "minutes"}
                    </p>
                  </div>
                  <div className="secondLine">
                    <form onSubmit={handleUpvote}>
                      <button
                        type="submit"
                        className={`upvoteButton ${
                          article.upvotes.includes(userId) ? "active" : ""
                        }`}
                      >
                        <svg
                          width="46"
                          height="46"
                          viewBox="0 0 46 46"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M25.1213 0.87868C23.9497 -0.292893 22.0503 -0.292893 20.8787 0.87868L1.7868 19.9706C0.615223 21.1421 0.615223 23.0416 1.7868 24.2132C2.95837 25.3848 4.85786 25.3848 6.02944 24.2132L23 7.24264L39.9706 24.2132C41.1421 25.3848 43.0416 25.3848 44.2132 24.2132C45.3848 23.0416 45.3848 21.1421 44.2132 19.9706L25.1213 0.87868ZM20 43C20 44.6569 21.3431 46 23 46C24.6569 46 26 44.6569 26 43L20 43ZM20 3L20 43L26 43L26 3L20 3Z"
                            fill="#141414"
                          />
                        </svg>
                      </button>
                    </form>{" "}
                    <p>{article.upvotes?.length || 0}</p> •{" "}
                    <p>{article.comments?.length || 0} commentaires</p> •{" "}
                    <p>{article.reads?.length || 0} lectures</p>
                  </div>
                </div>
              </div>
              <div className="articleContentInfo">
                <div className="heroSummary">
                  <h2>
                    sommaire
                    <span style={{ color: "var(--themeAccent)" }}>.</span>
                  </h2>
                  <ul>
                    {headings.map((heading) => (
                      <li key={heading.id}>
                        <Link href={`#${heading.id}`} className={heading.level}>
                          {heading.content}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="heroAudio">
                  <h2>
                    écoutez l&apos;article
                    <span style={{ color: "var(--themeAccent)" }}>.</span>
                  </h2>
                  <audio
                    className="articleAudio"
                    controls
                    src={article.audio}
                    style={{ width: "100%", maxWidth: "500px" }} // Optionnel : pour ajuster la largeur du lecteur
                  >
                    Votre navigateur ne prend pas en charge l&apos;élément
                    audio.
                  </audio>
                </div>
              </div>
            </div>
          </div>
          <div className="content fit articleCore">
            <div
              className="articleContent"
              dangerouslySetInnerHTML={createMarkup(article.content)}
            ></div>
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
                    href="https://discord.gg/URGXAVbPYj"
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
                {!isSubscribed ? (
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
                    Vous êtes inscrit à nos newsletters ! Merci de votre
                    engagement !
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="content fit articleComments">
            <div className="commentSection">
              <div className="reflect">
                <h2>
                  Cet article vous a fait réfléchir&nbsp;
                  <span style={{ color: "var(--themeAccent)" }}>?</span>
                </h2>
                <Link className="simpler" href="/thinking-corner">
                  Méditer dessus.{" "}
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
                </Link>
              </div>
              <div className="commentInput">
                <h2>
                  Commentaires
                  <span style={{ color: "var(--themeAccent)" }}>.</span>
                </h2>
                <form onSubmit={handleComment} className="commentOnTheArticle">
                  <textarea
                    name="content"
                    placeholder="Écrivez votre commentaire ici..."
                  ></textarea>
                  <input name="parentId" type="hidden" value="" />
                  <button type="submit" className="simpler">
                    Envoyer
                  </button>
                </form>
              </div>
              <div className="commentsList">
  {commentsTree && commentsTree.length > 0 ? (
    renderComments(commentsTree) // Utilisez l'arbre de commentaires ici
  ) : (
    <p>Aucun commentaire pour l&apos;instant.</p>
  )}
</div>
            </div>
            <div className="articleAside"></div>
          </div>
        </>
      ) : (
        <p>Chargement de l&apos;article...</p>
      )}
    </main>
  );
}
