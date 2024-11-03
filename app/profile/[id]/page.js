"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../layout/GlobalContext.js";

export default function Profile({ params }) {
  const {
    userToken,
    userId,
    userRole,
    createMarkup,
    formatDate,
    apiGateway,
    userUsername,
    setUserUsername,
    isSubscribed,
    setIsSubscribed,
    isAuthenticated,
  } = useGlobalContext();
  const { id } = params;
  const [user, setUser] = useState(null);
  const [userComments, setUserComments] = useState([]);
  const [userPublications, setUserPublications] = useState([]);
  const [userPublicationsTwo, setUserPublicationsTwo] = useState([]);
  const [userHistory, setUserHistory] = useState([]);
  const [userPostHistory, setUserPostHistory] = useState([]);
  const [userSavedArticles, setUserSavedArticles] = useState([]);
  const [userSavedPosts, setUserSavedPosts] = useState([]);
  const [loadMore1, setLoadMore1] = useState(false);
  const [loadMore2, setLoadMore2] = useState(false);
  const [loadMore3, setLoadMore3] = useState(false);
  const [loadMore4, setLoadMore4] = useState(false);
  const [loadMore5, setLoadMore5] = useState(false);
  const [loadMore6, setLoadMore6] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [loading, setLoading] = useState("");
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [cleanRegistrationDate, setCleanRegistrationDate] = useState("");
  const [cleanLastConnectedDate, setCleanLastConnectedDate] = useState("");

  const handleSave = async (event, articleId = id) => {
    event.preventDefault();

    try {
      // Effectuer la requête pour sauvegarder l'article
      const response = await fetch(`${apiGateway}/articles/save/${articleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`, // Ajout de l'autorisation ici
        },
      });

      if (!response.ok) {
        throw new Error("Une erreur est survenue lors de l'upvote");
      }

      const updatedArticleSave = await response.json();
      const isAlreadySaved = userSavedArticles.some(
        (article) => article._id === articleId
      );

      // Mise à jour des articles dans les listes
      const updatedUserPublications = userPublications.map((article) => {
        if (article._id === articleId) {
          return { ...article, savedNumber: updatedArticleSave };
        }
        return article;
      });

      const updatedUserHistory = userHistory.map((article) => {
        if (article._id === articleId) {
          return { ...article, savedNumber: updatedArticleSave };
        }
        return article;
      });

      // Si l'article est déjà sauvegardé, le retirer
      if (isAlreadySaved) {
        setUserSavedArticles((prevSavedArticles) =>
          prevSavedArticles.filter((article) => article._id !== articleId)
        );
      } else {
        // Si l'article n'est pas encore sauvegardé, récupérer les détails de l'article
        const articleResponse = await fetch(
          `${apiGateway}/articles/${articleId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`, // Ajout de l'autorisation ici
            },
          }
        );
        if (!articleResponse.ok) {
          throw new Error("Erreur lors de la récupération de l'article");
        }

        const articleDetails = await articleResponse.json();
        const newArticle = {
          _id: articleId,
          ...articleDetails,
          savedNumber: updatedArticleSave,
        };

        setUserSavedArticles((prevSavedArticles) => [
          newArticle,
          ...prevSavedArticles,
        ]);
      }

      // Mettre à jour les états des listes
      setUserPublications(updatedUserPublications);
      setUserHistory(updatedUserHistory);

      // Mise à jour de l'utilisateur avec l'article sauvegardé
      try {
        const saveResponse = await fetch(
          `${apiGateway}/auth/saveArticle/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`, // Ajout de l'autorisation ici
            },
            body: JSON.stringify({ savedArticles: articleId }),
          }
        );

        if (!saveResponse.ok) {
          throw new Error(
            "Une erreur est survenue lors de la sauvegarde de l'article sur le profil"
          );
        }
      } catch (error) {
        console.error("Erreur lors de la sauvegarde sur le profil:", error);
      }
    } catch (error) {
      console.error("Erreur lors de l'upvote:", error);
    }
  };

  const handleSavePosts = async (event, articleId = id) => {
    event.preventDefault();

    try {
      // Effectuer la requête pour sauvegarder l'article
      const response = await fetch(`${apiGateway}/posts/save/${articleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`, // Ajout de l'autorisation ici
        },
      });

      if (!response.ok) {
        throw new Error("Une erreur est survenue lors de l'upvote");
      }

      const updatedArticleSave = await response.json();
      const isAlreadySaved = userSavedPosts.some(
        (article) => article._id === articleId
      );

      // Mise à jour des articles dans les listes
      const updatedUserPublications = (
        user && user.role === "admin" ? userPublicationsTwo : userPublications
      )?.map((article) => {
        if (article?._id === articleId) {
          return { ...article, savedNumber: updatedArticleSave };
        }
        return article;
      });

      const updatedUserHistory = userPostHistory.map((article) => {
        if (article._id === articleId) {
          return { ...article, savedNumber: updatedArticleSave };
        }
        return article;
      });

      // Si l'article est déjà sauvegardé, le retirer
      if (isAlreadySaved) {
        setUserSavedPosts((prevSavedArticles) =>
          prevSavedArticles.filter((article) => article._id !== articleId)
        );
      } else {
        // Si l'article n'est pas encore sauvegardé, récupérer les détails de l'article
        const articleResponse = await fetch(
          `${apiGateway}/posts/${articleId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`, // Ajout de l'autorisation ici
            },
          }
        );
        if (!articleResponse.ok) {
          throw new Error("Erreur lors de la récupération de l'article");
        }

        const articleDetails = await articleResponse.json();
        const newArticle = {
          _id: articleId,
          ...articleDetails,
          savedNumber: updatedArticleSave,
        };

        setUserSavedPosts((prevSavedArticles) => [
          newArticle,
          ...prevSavedArticles,
        ]);
      }

      // Mettre à jour les états des listes
      {
        user.role === "admin"
          ? setUserPublicationsTwo(updatedUserPublications)
          : setUserPublications(updatedUserPublications);
      }
      setUserPostHistory(updatedUserHistory);

      // Mise à jour de l'utilisateur avec l'article sauvegardé
      try {
        const saveResponse = await fetch(
          `${apiGateway}/auth/savePost/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`, // Ajout de l'autorisation ici
            },
            body: JSON.stringify({ savedArticles: articleId }),
          }
        );

        if (!saveResponse.ok) {
          throw new Error(
            "Une erreur est survenue lors de la sauvegarde de l'article sur le profil"
          );
        }
      } catch (error) {
        console.error("Erreur lors de la sauvegarde sur le profil:", error);
      }
    } catch (error) {
      console.error("Erreur lors de l'upvote:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated && userId !== id) {
      setError("Vous n'êtes pas autorisé à modifier cet utilisateur");
      return;
    }

    try {
      const response = await fetch(`${apiGateway}/auth/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          username: userUsername,
          newsSubscription: isSubscribed,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedUser = await response.json();
      setUser((prevUser) => ({
        ...prevUser,
        username: updatedUser.username,
      }));
    } catch (error) {
      setError(error.message);
    }

    try {
      const response = await fetch(
        `${apiGateway}/comments/updateByAuthor/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            authorUsername: userUsername,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      setError(error.message);
    }

    try {
      const response = await fetch(`${apiGateway}/posts/updateByAuthor/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          authorUsername: userUsername,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setUpdating(null);
    }
  };

  const deleteArticleFileFromCloudinary = async (fileUrl, resourceType) => {
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

  const deletePostFileFromCloudinary = async (fileUrl, resourceType) => {
    try {
      const response = await fetch(`${apiGateway}/posts/deletePostFile`, {
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

  const handleArticleDeletion = async (e) => {
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
      ]),
    ].join(",");

    await deleteArticleFileFromCloudinary(articleCover, "image");
    await deleteArticleFileFromCloudinary(articleAudio, "video");

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

      setUserHistory((prevArticles) =>
        prevArticles.filter((a) => a._id !== articleId)
      );
      setUserSavedArticles((prevArticles) =>
        prevArticles.filter((a) => a._id !== articleId)
      );
      {
        user.role === "admin" &&
          setUserPublications((prevArticles) =>
            prevArticles.filter((a) => a._id !== articleId)
          );
      }
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
            articleId: articleId,
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error(
          `Erreur lors de la mise à jour des utilisateurs : ${updateResponse.status}`
        );
      }

      console.log("Article supprimé et utilisateurs mis à jour avec succès.");
    } catch (error) {
      setError(error.message);
    } finally {
      setDeleting(null);
      setLoading(false);
    }
  };

  const handlePostDeletion = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError("Vous n'êtes pas autorisé à supprimer un post");
      return;
    }
    const articleId = e.target.articleId.value;
    const articleComments = e.target.articleComments.value;
    let articleCover;
    {e.target.articleCover.value ? articleCover = e.target.articleCover.value : articleCover = null}
    const articleUpvotes = e.target.articleUpvotes.value;
    const articleSaved = e.target.articleSaved.value;
    const articleReads = e.target.articleReads.value;
    const userIds = [
      ...new Set([
        ...articleUpvotes.split(","),
        ...articleSaved.split(","),
        ...articleReads.split(","),
      ]),
    ].join(",");

    await deletePostFileFromCloudinary(articleCover, "image");

    try {
      const response = await fetch(`${apiGateway}/posts/${articleId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setUserPostHistory((prevArticles) =>
        prevArticles.filter((a) => a._id !== articleId)
      );
      setUserSavedPosts((prevArticles) =>
        prevArticles.filter((a) => a._id !== articleId)
      );
      {
        user.role === "admin"
          ? setUserPublicationsTwo((prevArticles) =>
              prevArticles.filter((a) => a._id !== articleId)
            )
          : setUserPublications((prevArticles) =>
              prevArticles.filter((a) => a._id !== articleId)
            );
      }
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
        `${apiGateway}/auth/removePostByIds?ids=${userIds}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            articleId: articleId,
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error(
          `Erreur lors de la mise à jour des utilisateurs : ${updateResponse.status}`
        );
      }

      console.log("Article supprimé et utilisateurs mis à jour avec succès.");
    } catch (error) {
      setError(error.message);
    } finally {
      setDeleting(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${apiGateway}/auth/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData = await response.json();
        setUser(userData.user);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUser();
  }, [id, userToken]);

  useEffect(() => {
    if (user) {
      if (user.registrationDate) {
        const registrationDate = new Date(user.registrationDate);
        const day = registrationDate.getDate();
        let month = registrationDate.getMonth() + 1; // Les mois commencent à 0
        month = month.toString().padStart(2, "0");
        const year = registrationDate.getFullYear();
        setCleanRegistrationDate(`${day}/${month}/${year}`);
      }
      if (user.lastConnected) {
        const now = new Date();
        const lastConnectedDate = new Date(user.lastConnected);
        const diffInMillis = now - lastConnectedDate;
        const diffInHours = Math.floor(diffInMillis / (1000 * 60 * 60));
        const diffInMinutes = Math.floor(diffInMillis / (1000 * 60)); // Ajout de la différence en minutes
        const diffInDays = Math.floor(diffInMillis / (1000 * 60 * 60 * 24));

        if (diffInHours < 24) {
          if (diffInHours === 0) {
            if (diffInMinutes < 5) {
              // Si moins de 5 minutes, afficher "En ligne"
              setCleanLastConnectedDate("En ligne");
            } else {
              // Si moins d'une heure, mais plus de 5 minutes, afficher en minutes
              setCleanLastConnectedDate(
                `En ligne il y a ${diffInMinutes} minute${
                  diffInMinutes !== 1 ? "s" : ""
                }`
              );
            }
          } else {
            // Si plus d'une heure mais moins d'un jour
            setCleanLastConnectedDate(
              `En ligne il y a ${diffInHours} heure${
                diffInHours !== 1 ? "s" : ""
              }`
            );
          }
        } else if (diffInDays === 1) {
          setCleanLastConnectedDate("En ligne hier");
        } else if (diffInDays === 2) {
          setCleanLastConnectedDate("En ligne il y a 2 jours");
        } else {
          const day = String(lastConnectedDate.getDate()).padStart(2, "0");
          const month = String(lastConnectedDate.getMonth() + 1).padStart(
            2,
            "0"
          );
          const year = lastConnectedDate.getFullYear();
          setCleanLastConnectedDate(
            `Vu pour la dernière fois le ${day}/${month}/${year}`
          );
        }
      }
      const fetchRemainingData = async () => {
        try {
          const response = await fetch(`${apiGateway}/comments/author/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const userData = await response.json();
          setUserComments(userData);
        } catch (error) {
          setError(error.message);
        }
        if (user.role === "admin") {
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

            const userData = await response.json();
            setUserPublications(userData.reverse());
          } catch (error) {
            setError(error.message);
          }
          try {
            const response = await fetch(`${apiGateway}/posts/author/${id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const userData = await response.json();
            setUserPublicationsTwo(userData.reverse());
          } catch (error) {
            setError(error.message);
          }
        } else {
          try {
            const response = await fetch(`${apiGateway}/posts/author/${id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const userData = await response.json();
            setUserPublications(userData.reverse());
          } catch (error) {
            setError(error.message);
          }
        }
        const allArticleIds = [
          ...new Set([
            ...(user.articlesHistory || []),
            ...(user.savedArticles || []),
          ]),
        ];

        if (allArticleIds.length > 0) {
          const articlesResponse = await fetch(
            `${apiGateway}/articles/by-ids?ids=${allArticleIds.join(",")}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!articlesResponse.ok) {
            throw new Error(`HTTP error! status: ${articlesResponse.status}`);
          }

          const articlesData = await articlesResponse.json();

          const userHistoryArticles = articlesData.filter((article) =>
            user.articlesHistory.includes(article._id)
          );
          const savedUserArticles = articlesData.filter((article) =>
            user.savedArticles.includes(article._id)
          );

          setUserHistory(userHistoryArticles.reverse());
          setUserSavedArticles(savedUserArticles.reverse());
        }
        const allPostIds = [
          ...new Set([
            ...(user.postsHistory || []),
            ...(user.savedPosts || []),
          ]),
        ];

        if (allPostIds.length > 0) {
          const articlesResponse = await fetch(
            `${apiGateway}/posts/by-ids?ids=${allPostIds.join(",")}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!articlesResponse.ok) {
            throw new Error(`HTTP error! status: ${articlesResponse.status}`);
          }

          const articlesData = await articlesResponse.json();

          const userHistoryArticles = articlesData.filter((article) =>
            user.postsHistory.includes(article._id)
          );
          const savedUserArticles = articlesData.filter((article) =>
            user.savedPosts.includes(article._id)
          );

          setUserPostHistory(userHistoryArticles.reverse());
          setUserSavedPosts(savedUserArticles.reverse());
        }
      };
      fetchRemainingData();
    }
  }, [user, id, userToken]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>; // Si "user" est null, on affiche un message de chargement
  }

  return (
    <main className="profile">
      {loading && "Requête en cours... Mise à jour du contenu."}
      <div className="globalInfo">
        <div className="mainInfo">
          <div className="top">
            <h2>{user.username}</h2>
            <span>·</span>
            <p>Membre depuis le {cleanRegistrationDate}</p>
            {user.strikes !== 0 && (
              <>
                <span>·</span>
                <p>
                  {user.strikes === 1
                    ? "X"
                    : user.strikes === 2
                    ? "XX"
                    : user.strikes === 3
                    ? "XXX"
                    : ""}
                </p>
              </>
            )}
            {userId === id && (
              <button
                onClick={() => setUpdating(!updating)}
                className={updating && "active"}
                title="Modifiez les informations de votre profil"
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24.1004 0.274587C23.7343 -0.0915292 23.1407 -0.0915292 22.7746 0.274587L19.6875 3.36169L26.6383 10.3125L29.7254 7.22541C30.0916 6.8593 30.0916 6.2657 29.7254 5.89959L24.1004 0.274587Z"
                    fill="black"
                  />
                  <path
                    d="M25.3125 11.6383L18.3617 4.68751L6.1742 16.875H6.5625C7.08027 16.875 7.5 17.2947 7.5 17.8125V18.75H8.4375C8.95527 18.75 9.375 19.1697 9.375 19.6875V20.625H10.3125C10.8303 20.625 11.25 21.0447 11.25 21.5625V22.5H12.1875C12.7053 22.5 13.125 22.9197 13.125 23.4375V23.8259L25.3125 11.6383Z"
                    fill="black"
                  />
                  <path
                    d="M11.3094 25.6415C11.271 25.5391 11.25 25.4283 11.25 25.3125V24.375H10.3125C9.79473 24.375 9.375 23.9553 9.375 23.4375V22.5H8.4375C7.91973 22.5 7.5 22.0803 7.5 21.5625V20.625H6.5625C6.04473 20.625 5.625 20.2053 5.625 19.6875V18.75H4.6875C4.57175 18.75 4.4609 18.729 4.35854 18.6907L4.02461 19.0246C3.93484 19.1144 3.86423 19.2214 3.81708 19.3393L0.0670804 28.7143C-0.0722009 29.0625 0.00943104 29.4602 0.274615 29.7254C0.539798 29.9906 0.937503 30.0722 1.28571 29.9329L10.6607 26.1829C10.7786 26.1358 10.8857 26.0652 10.9754 25.9754L11.3094 25.6415Z"
                    fill="black"
                  />
                </svg>
              </button>
            )}
            {updating && (
              <form onSubmit={handleSubmit} className="popup accentTheme">
                <h3>Modifiez votre profil</h3>
                <div className="formLine">
                  <label htmlFor="username">Votre pseudo</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={userUsername}
                    onChange={(e) => setUserUsername(e.target.value)}
                  />
                </div>
                <div className="formLine">
                  <label htmlFor="newsSubscription">
                    Souhaitez-vous être abonné aux newsletters hebdomadaires ?{" "}
                    <br />
                    <span>&#40;Cochez la case si vous le souhaitez&#41;</span>
                  </label>
                  <input
                    id="newsSubscription"
                    name="newsSubscription"
                    type="checkbox"
                    value={isSubscribed}
                    checked={isSubscribed && true}
                    onChange={(e) => setIsSubscribed(e.target.checked)}
                  />
                </div>
                <div className="choices">
                  <button type="submit" className="simpler danger">
                    Enregistrer les modifications.
                  </button>
                  <button
                    type="button"
                    className="simpler"
                    onClick={() => setUpdating(!updating)}
                  >
                    Annuler
                  </button>
                </div>
              </form>
            )}
          </div>
          <p>
            {cleanLastConnectedDate === "En ligne" && (
              <span className="activeBubble">•</span>
            )}
            {cleanLastConnectedDate}
          </p>
        </div>
        <button>
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.5117 2.62596C22.4797 -0.875322 17.5203 -0.875321 16.4883 2.62597L16.2381 3.47508C15.5787 5.71225 13.0234 6.77068 10.9752 5.65503L10.1978 5.23159C6.99231 3.48554 3.48554 6.99231 5.2316 10.1978L5.65503 10.9752C6.77069 13.0234 5.71225 15.5787 3.47508 16.2381L2.62596 16.4883C-0.875322 17.5203 -0.875321 22.4797 2.62597 23.5117L3.47508 23.7619C5.71225 24.4213 6.77068 26.9766 5.65503 29.0248L5.2316 29.8022C3.48554 33.0077 6.9923 36.5145 10.1978 34.7684L10.9752 34.345C13.0234 33.2293 15.5787 34.2878 16.2381 36.5249L16.4883 37.374C17.5203 40.8753 22.4797 40.8753 23.5117 37.374L23.7619 36.5249C24.4213 34.2878 26.9766 33.2293 29.0248 34.345L29.8022 34.7684C33.0077 36.5145 36.5145 33.0077 34.7684 29.8022L34.345 29.0248C33.2293 26.9766 34.2878 24.4213 36.5249 23.7619L37.374 23.5117C40.8753 22.4797 40.8753 17.5203 37.374 16.4883L36.5249 16.2381C34.2878 15.5787 33.2293 13.0234 34.345 10.9752L34.7684 10.1978C36.5145 6.9923 33.0077 3.48554 29.8022 5.2316L29.0248 5.65503C26.9766 6.77069 24.4213 5.71225 23.7619 3.47508L23.5117 2.62596ZM20 27.322C15.9562 27.322 12.678 24.0438 12.678 20C12.678 15.9562 15.9562 12.678 20 12.678C24.0438 12.678 27.322 15.9562 27.322 20C27.322 24.0438 24.0438 27.322 20 27.322Z"
              fill="#141414"
            />
          </svg>
        </button>
      </div>
      <div className="stats">
        <h2>
          statistiques
          <span style={{ color: "var(--themeAccent)" }}>.</span>
        </h2>
        <div className="statsContainer">
          <div className="stat">
            <p className="statNum">{user.articlesHistory.length}</p>
            <p className="statContext">
              {user.articlesHistory.length > 1 ? "articles lus" : "article lu"}
            </p>
          </div>
          <div className="stat">
            <p className="statNum">{user.upvotedArticles.length}</p>
            <p className="statContext">
              {user.upvotedArticles.length > 1
                ? "articles upvotés"
                : "article upvoté"}
            </p>
          </div>
          <div className="stat">
            <p className="statNum">{user.savedArticles.length}</p>
            <p className="statContext">
              {user.savedArticles.length > 1
                ? "articles sauvegardés"
                : "article sauvegardé"}
            </p>
          </div>
          <div className="stat">
            <p className="statNum">{user.postsHistory.length}</p>
            <p className="statContext">
              {user.postsHistory.length > 1 ? "posts lus" : "post lu"}
            </p>
          </div>
          <div className="stat">
            <p className="statNum">{user.upvotedPosts.length}</p>
            <p className="statContext">
              {user.upvotedPosts.length > 1 ? "posts upvotés" : "post upvoté"}
            </p>
          </div>
          <div className="stat">
            <p className="statNum">{user.savedPosts.length}</p>
            <p className="statContext">
              {user.savedPosts.length > 1
                ? "posts sauvegardés"
                : "post sauvegardé"}
            </p>
          </div>
          <div className="stat">
            <p className="statNum">{userComments.length}</p>
            <p className="statContext">
              {userComments.length > 1
                ? "commentaires postés"
                : "commentaire posté"}
            </p>
          </div>
          <div className="stat">
            <p className="statNum">{userPublications.length}</p>
            <p className="statContext">
              {user.role === "admin"
                ? userPublications.length > 1
                  ? "articles postés"
                  : "article posté"
                : userPublications.length > 1
                ? "posts postés"
                : "post posté"}
            </p>
          </div>
        </div>
      </div>
      <div className="articles">
        <h2>
          historique de lectures
          <span style={{ color: "var(--themeAccent)" }}>.</span>
        </h2>
        <div className={`articleList ${loadMore1 ? "active" : ""}`}>
          {userHistory.length > 0 ? (
            userHistory.map((article) => (
              <div key={article._id} className="articleCard">
                <Image
                  src={article.cover}
                  width="300"
                  height="150"
                  alt="The article's cover"
                />
                {isAuthenticated && (
                  <form
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
                )}
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
                  <Link className="simpler" href={`/${article._id}`}>
                    {user.role === "admin"
                      ? "Lire l'article."
                      : "Lire le post."}
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>Aucune publication pour l&apos;instant.</p>
          )}
        </div>
        {userHistory.length > 5 && (
          <button
            className={`simpler ${loadMore1 ? "active" : ""}`}
            onClick={() => setLoadMore1(true)}
          >
            voir toute la liste.
          </button>
        )}
      </div>
      <div className="articles">
        <h2>
          à lire plus tard
          <span style={{ color: "var(--themeAccent)" }}>.</span>
        </h2>
        <div className={`articleList ${loadMore2 ? "active" : ""}`}>
          {userSavedArticles.length > 0 ? (
            userSavedArticles.map((article) => (
              <div key={article._id} className="articleCard">
                <Image
                  src={article.cover}
                  width="300"
                  height="150"
                  alt="The article's cover"
                />
                {isAuthenticated && (
                  <form
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
                )}
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
                  <Link className="simpler" href={`/${article._id}`}>
                    {user.role === "admin"
                      ? "Lire l'article."
                      : "Lire le post."}
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>Aucune publication pour l&apos;instant.</p>
          )}
        </div>
        {userSavedArticles.length > 5 && (
          <button
            className={`simpler ${loadMore2 ? "active" : ""}`}
            onClick={() => setLoadMore2(true)}
          >
            voir toute la liste.
          </button>
        )}
      </div>
      <div className="articles">
        <h2>
          {user.role === "admin" ? "articles publiés" : "posts publiés"}
          <span style={{ color: "var(--themeAccent)" }}>.</span>
        </h2>
        <div className={`articleList ${loadMore3 ? "active" : ""}`}>
          {userPublications.length > 0 ? (
            userPublications.map((article) => (
              <div key={article._id} className="articleCard">
                <Image
                  src={article.cover}
                  width="300"
                  height="150"
                  alt="The article's cover"
                />
                {isAuthenticated && (
                  <form
                    className="saveArticle"
                    onSubmit={(event) =>
                      user.role === "admin"
                        ? handleSave(event, article._id)
                        : handleSavePosts(event, article._id)
                    }
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
                )}
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
                  <Link
                    className="simpler"
                    href={
                      user.role === "admin"
                        ? `/${article._id}`
                        : `/agora/${article._id}`
                    }
                  >
                    {user.role === "admin"
                      ? "Lire l'article."
                      : "Lire le post."}
                  </Link>
                  {isAuthenticated && userId === article.author && (
                    <>
                    <Link
                      style={{ marginLeft: "20px" }}
                      className="simpler"
                      href={
                        user.role === "admin"
                          ? `/edit/${article._id}`
                          : `/agora/edit/${article._id}`
                      }
                    >
                      <svg
                        width="30"
                        height="25"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M24.1004 0.274587C23.7343 -0.0915292 23.1407 -0.0915292 22.7746 0.274587L19.6875 3.36169L26.6383 10.3125L29.7254 7.22541C30.0916 6.8593 30.0916 6.2657 29.7254 5.89959L24.1004 0.274587Z"
                          fill="black"
                        />
                        <path
                          d="M25.3125 11.6383L18.3617 4.68751L6.1742 16.875H6.5625C7.08027 16.875 7.5 17.2947 7.5 17.8125V18.75H8.4375C8.95527 18.75 9.375 19.1697 9.375 19.6875V20.625H10.3125C10.8303 20.625 11.25 21.0447 11.25 21.5625V22.5H12.1875C12.7053 22.5 13.125 22.9197 13.125 23.4375V23.8259L25.3125 11.6383Z"
                          fill="black"
                        />
                        <path
                          d="M11.3094 25.6415C11.271 25.5391 11.25 25.4283 11.25 25.3125V24.375H10.3125C9.79473 24.375 9.375 23.9553 9.375 23.4375V22.5H8.4375C7.91973 22.5 7.5 22.0803 7.5 21.5625V20.625H6.5625C6.04473 20.625 5.625 20.2053 5.625 19.6875V18.75H4.6875C4.57175 18.75 4.4609 18.729 4.35854 18.6907L4.02461 19.0246C3.93484 19.1144 3.86423 19.2214 3.81708 19.3393L0.0670804 28.7143C-0.0722009 29.0625 0.00943104 29.4602 0.274615 29.7254C0.539798 29.9906 0.937503 30.0722 1.28571 29.9329L10.6607 26.1829C10.7786 26.1358 10.8857 26.0652 10.9754 25.9754L11.3094 25.6415Z"
                          fill="black"
                        />
                      </svg>
                    </Link>
                    {deleting === null && (
                        <button
                          onClick={() => setDeleting(article._id)}
                          className="simpler danger"
                        >
                          <svg width="30" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 1.5V2.5H14.5C14.7761 2.5 15 2.72386 15 3C15 3.27614 14.7761 3.5 14.5 3.5H13.9616L13.1088 14.1595C13.0257 15.1989 12.1579 16 11.1152 16H4.88479C3.84207 16 2.97431 15.1989 2.89116 14.1595L2.0384 3.5H1.5C1.22386 3.5 1 3.27614 1 3C1 2.72386 1.22386 2.5 1.5 2.5H5V1.5C5 0.671573 5.67157 0 6.5 0H9.5C10.3284 0 11 0.671573 11 1.5ZM6 1.5V2.5H10V1.5C10 1.22386 9.77614 1 9.5 1H6.5C6.22386 1 6 1.22386 6 1.5ZM4.49999 5.0285L4.99999 13.5285C5.0162 13.8042 5.25282 14.0145 5.52849 13.9983C5.80415 13.9821 6.01448 13.7454 5.99826 13.4698L5.49826 4.96978C5.48205 4.69411 5.24543 4.48379 4.96976 4.5C4.6941 4.51622 4.48377 4.75283 4.49999 5.0285ZM11.0302 4.50086C10.7546 4.48465 10.5179 4.69497 10.5017 4.97064L10.0017 13.4706C9.98552 13.7463 10.1958 13.9829 10.4715 13.9991C10.7472 14.0154 10.9838 13.805 11 13.5294L11.5 5.02936C11.5162 4.75369 11.3059 4.51708 11.0302 4.50086ZM8 4.5C7.72386 4.5 7.5 4.72386 7.5 5V13.5C7.5 13.7761 7.72386 14 8 14C8.27615 14 8.5 13.7761 8.5 13.5V5C8.5 4.72386 8.27615 4.5 8 4.5Z" fill="black"/>
</svg>
                        </button>
                      )}
                      {deleting === article._id && (
                        <button
                          className="screenBlock"
                          onClick={() => setDeleting(null)}
                        ></button>
                      )}
                      {deleting === article._id && (
                        <form onSubmit={user.role === 'admin' ? handleArticleDeletion : handlePostDeletion} className="popup">
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
                          {article.cover && <input
                            type="text"
                            name="articleCover"
                            value={article.cover}
                            hidden
                            readOnly
                          />}
                          {article.audio && <input
                            type="text"
                            name="articleAudio"
                            value={article.audio}
                            hidden
                            readOnly
                          />}
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
                      )}</>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>Aucune publication pour l&apos;instant.</p>
          )}
        </div>
        {userPublications.length > 5 && (
          <button
            className={`simpler ${loadMore3 ? "active" : ""}`}
            onClick={() => setLoadMore3(true)}
          >
            voir toute la liste.
          </button>
        )}
      </div>
      {userPublicationsTwo.length > 0 && (
        <div className="articles">
          <h2>
            posts publiés
            <span style={{ color: "var(--themeAccent)" }}>.</span>
          </h2>
          <div className={`articleList ${loadMore4 ? "active" : ""}`}>
            {userPublicationsTwo.length > 0 ? (
              userPublicationsTwo.map((post) => (
                <div key={post._id} className="articleCard">
                  {post.cover && (
                    <Image
                      src={post.cover}
                      width="300"
                      height="150"
                      alt="The article's cover"
                    />
                  )}
                  {isAuthenticated && (
                    <form
                      className="saveArticle"
                      onSubmit={(event) => handleSavePosts(event, post._id)}
                    >
                      <button
                        type="submit"
                        className={`saveButton ${
                          post.savedNumber.includes(userId) ? "active" : ""
                        }`}
                      >
                        {post.savedNumber.includes(userId) ? (
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
                  )}
                  <div className="articleMainInfo">
                    <span className="articleCategory">{post.category}</span>
                    <h3>
                      {post.title}
                      <span style={{ color: "var(--themeAccent)" }}>.</span>
                    </h3>
                    {post.content && (
                      <div
                        className="intro post"
                        dangerouslySetInnerHTML={createMarkup(post.content)}
                      />
                    )}
                    <div className="articleMainData">
                      <p>{formatDate(post.publishDate)}</p>
                    </div>
                    <Link className="simpler" href={`/agora/${post._id}`}>
                      Lire le post.
                    </Link>
                    {isAuthenticated && userId === post.author && (
                      <>
                      <Link
                        style={{ marginLeft: "20px" }}
                        className="simpler"
                        href={`/agora/edit/${post._id}`}
                      >
                        <svg
                          width="30"
                          height="25"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M24.1004 0.274587C23.7343 -0.0915292 23.1407 -0.0915292 22.7746 0.274587L19.6875 3.36169L26.6383 10.3125L29.7254 7.22541C30.0916 6.8593 30.0916 6.2657 29.7254 5.89959L24.1004 0.274587Z"
                            fill="black"
                          />
                          <path
                            d="M25.3125 11.6383L18.3617 4.68751L6.1742 16.875H6.5625C7.08027 16.875 7.5 17.2947 7.5 17.8125V18.75H8.4375C8.95527 18.75 9.375 19.1697 9.375 19.6875V20.625H10.3125C10.8303 20.625 11.25 21.0447 11.25 21.5625V22.5H12.1875C12.7053 22.5 13.125 22.9197 13.125 23.4375V23.8259L25.3125 11.6383Z"
                            fill="black"
                          />
                          <path
                            d="M11.3094 25.6415C11.271 25.5391 11.25 25.4283 11.25 25.3125V24.375H10.3125C9.79473 24.375 9.375 23.9553 9.375 23.4375V22.5H8.4375C7.91973 22.5 7.5 22.0803 7.5 21.5625V20.625H6.5625C6.04473 20.625 5.625 20.2053 5.625 19.6875V18.75H4.6875C4.57175 18.75 4.4609 18.729 4.35854 18.6907L4.02461 19.0246C3.93484 19.1144 3.86423 19.2214 3.81708 19.3393L0.0670804 28.7143C-0.0722009 29.0625 0.00943104 29.4602 0.274615 29.7254C0.539798 29.9906 0.937503 30.0722 1.28571 29.9329L10.6607 26.1829C10.7786 26.1358 10.8857 26.0652 10.9754 25.9754L11.3094 25.6415Z"
                            fill="black"
                          />
                        </svg>
                      </Link>
                      {deleting === null && (
                        <button
                          onClick={() => setDeleting(post._id)}
                          className="simpler danger"
                        >
                          <svg width="30" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 1.5V2.5H14.5C14.7761 2.5 15 2.72386 15 3C15 3.27614 14.7761 3.5 14.5 3.5H13.9616L13.1088 14.1595C13.0257 15.1989 12.1579 16 11.1152 16H4.88479C3.84207 16 2.97431 15.1989 2.89116 14.1595L2.0384 3.5H1.5C1.22386 3.5 1 3.27614 1 3C1 2.72386 1.22386 2.5 1.5 2.5H5V1.5C5 0.671573 5.67157 0 6.5 0H9.5C10.3284 0 11 0.671573 11 1.5ZM6 1.5V2.5H10V1.5C10 1.22386 9.77614 1 9.5 1H6.5C6.22386 1 6 1.22386 6 1.5ZM4.49999 5.0285L4.99999 13.5285C5.0162 13.8042 5.25282 14.0145 5.52849 13.9983C5.80415 13.9821 6.01448 13.7454 5.99826 13.4698L5.49826 4.96978C5.48205 4.69411 5.24543 4.48379 4.96976 4.5C4.6941 4.51622 4.48377 4.75283 4.49999 5.0285ZM11.0302 4.50086C10.7546 4.48465 10.5179 4.69497 10.5017 4.97064L10.0017 13.4706C9.98552 13.7463 10.1958 13.9829 10.4715 13.9991C10.7472 14.0154 10.9838 13.805 11 13.5294L11.5 5.02936C11.5162 4.75369 11.3059 4.51708 11.0302 4.50086ZM8 4.5C7.72386 4.5 7.5 4.72386 7.5 5V13.5C7.5 13.7761 7.72386 14 8 14C8.27615 14 8.5 13.7761 8.5 13.5V5C8.5 4.72386 8.27615 4.5 8 4.5Z" fill="black"/>
</svg>
                        </button>
                      )}
                      {deleting === post._id && (
                        <button
                          className="screenBlock"
                          onClick={() => setDeleting(null)}
                        ></button>
                      )}
                      {deleting === post._id && (
                        <form onSubmit={handlePostDeletion} className="popup">
                          <label>
                            Vous vous apprêtez à supprimer l&apos;article &quot;
                            <b>{post.title}</b>&quot;, êtes-vous sûr de vouloir
                            poursuivre ?<br />
                            <b>Cette action est irréversible.</b>
                          </label>
                          <input
                            type="text"
                            name="articleId"
                            value={post._id}
                            hidden
                            readOnly
                          />
                          <input
                            type="text"
                            name="articleComments"
                            value={post.comments.join(",")}
                            hidden
                            readOnly
                          />
                          {post.cover && <input
                            type="text"
                            name="articleCover"
                            value={post.cover}
                            hidden
                            readOnly
                          />}
                          <input
                            type="text"
                            name="articleUpvotes"
                            value={post.upvotes}
                            hidden
                            readOnly
                          />
                          <input
                            type="text"
                            name="articleSaved"
                            value={post.savedNumber}
                            hidden
                            readOnly
                          />
                          <input
                            type="text"
                            name="articleReads"
                            value={post.reads}
                            hidden
                            readOnly
                          />
                          <div className="choices">
                            <button type="submit" className="simpler danger">
                              Supprimer le post.
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
                      )}</>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>Aucune publication pour l&apos;instant.</p>
            )}
          </div>
          {userPublicationsTwo.length > 5 && (
            <button
              className={`simpler ${loadMore4 ? "active" : ""}`}
              onClick={() => setLoadMore4(true)}
            >
              voir toute la liste.
            </button>
          )}
        </div>
      )}
      {userSavedPosts.length > 0 && (
        <div className="articles">
          <h2>
            posts sauvegardés
            <span style={{ color: "var(--themeAccent)" }}>.</span>
          </h2>
          <div className={`articleList ${loadMore5 ? "active" : ""}`}>
            {userSavedPosts.length > 0 ? (
              userSavedPosts.map((post) => (
                <div key={post._id} className="articleCard">
                  {post.cover && (
                    <Image
                      src={post.cover}
                      width="300"
                      height="150"
                      alt="The article's cover"
                    />
                  )}
                  {isAuthenticated && (
                    <form
                      className="saveArticle"
                      onSubmit={(event) => handleSavePosts(event, post._id)}
                    >
                      <button
                        type="submit"
                        className={`saveButton ${
                          post.savedNumber.includes(userId) ? "active" : ""
                        }`}
                      >
                        {post.savedNumber.includes(userId) ? (
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
                  )}
                  <div className="articleMainInfo">
                    <span className="articleCategory">{post.category}</span>
                    <h3>
                      {post.title}
                      <span style={{ color: "var(--themeAccent)" }}>.</span>
                    </h3>
                    {post.content && (
                      <div
                        className="intro post"
                        dangerouslySetInnerHTML={createMarkup(post.content)}
                      />
                    )}
                    <div className="articleMainData">
                      <p>{formatDate(post.publishDate)}</p>
                    </div>
                    <Link className="simpler" href={`/agora/${post._id}`}>
                      Lire le post.
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>Aucune publication pour l&apos;instant.</p>
            )}
          </div>
          {userSavedPosts.length > 5 && (
            <button
              className={`simpler ${loadMore5 ? "active" : ""}`}
              onClick={() => setLoadMore5(true)}
            >
              voir toute la liste.
            </button>
          )}
        </div>
      )}
      {userPostHistory.length > 0 && (
        <div className="articles">
          <h2>
            posts consultés
            <span style={{ color: "var(--themeAccent)" }}>.</span>
          </h2>
          <div className={`articleList ${loadMore6 ? "active" : ""}`}>
            {userPostHistory.length > 0 ? (
              userPostHistory.map((post) => (
                <div key={post._id} className="articleCard">
                  {post.cover && (
                    <Image
                      src={post.cover}
                      width="300"
                      height="150"
                      alt="The article's cover"
                    />
                  )}
                  {isAuthenticated && (
                    <form
                      className="saveArticle"
                      onSubmit={(event) => handleSavePosts(event, post._id)}
                    >
                      <button
                        type="submit"
                        className={`saveButton ${
                          post.savedNumber.includes(userId) ? "active" : ""
                        }`}
                      >
                        {post.savedNumber.includes(userId) ? (
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
                  )}
                  <div className="articleMainInfo">
                    <span className="articleCategory">{post.category}</span>
                    <h3>
                      {post.title}
                      <span style={{ color: "var(--themeAccent)" }}>.</span>
                    </h3>
                    {post.content && (
                      <div
                        className="intro post"
                        dangerouslySetInnerHTML={createMarkup(post.content)}
                      />
                    )}
                    <div className="articleMainData">
                      <p>{formatDate(post.publishDate)}</p>
                    </div>
                    <Link className="simpler" href={`/agora/${post._id}`}>
                      Lire le post.
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>Aucune publication pour l&apos;instant.</p>
            )}
          </div>
          {userPostHistory.length > 5 && (
            <button
              className={`simpler ${loadMore6 ? "active" : ""}`}
              onClick={() => setLoadMore6(true)}
            >
              voir toute la liste.
            </button>
          )}
        </div>
      )}
    </main>
  );
}
