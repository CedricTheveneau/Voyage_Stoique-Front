"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../layout/GlobalContext";
import axios from "axios";

export const calculateReadingTime = (content) => {
  const text = content.replace(/<[^>]*>/g, " ").trim();
  const words = text.split(/\s+/).filter((word) => word.length > 0).length;
  const wordsPerMinute = 200;
  const readingTimeInMinutes = Math.ceil(words / wordsPerMinute);
  return readingTimeInMinutes;
};

export default function CreateArticle() {
  const {
    isAuthenticated,
    userId,
    userRole,
    userToken,
    apiGateway,
    categories,
  } = useGlobalContext();
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [cover, setCover] = useState(null);
  const [content, setContent] = useState("");
  const [audio, setAudio] = useState(null);
  const [keywords, setKeywords] = useState("");
  const [category, setCategory] = useState(
    categories ? categories[0] : "defaultCategory"
  );
  const [readingTime, setReadingTime] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || userRole !== "admin") {
      router.push("/");
      return;
    }
  }, []);

  useEffect(() => {
    setReadingTime(calculateReadingTime(content));
  }, [content]);

  const uploadFileToCloudinary = async (file, resourceType) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    ); // Remplace par ton preset
    formData.append("resource_type", resourceType);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
        formData
      );
      return response.data.secure_url; // Retourne l'URL de l'image ou de l'audio
    } catch (error) {
      console.error("Erreur lors de l'upload vers Cloudinary:", error);
      throw new Error("Erreur lors de l'upload vers Cloudinary");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated || userRole !== "admin") {
      setError("Vous n'êtes pas autorisé à créer un article");
      return;
    }

    setLoading(true); // Commencer le chargement

    try {
      // Upload des fichiers sur Cloudinary
      const coverUrl = cover
        ? await uploadFileToCloudinary(cover, "image")
        : null; // Upload de l'image
      const audioUrl = audio
        ? await uploadFileToCloudinary(audio, "video")
        : null; // Upload de l'audio

      const response = await fetch(`${apiGateway}/articles/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          title,
          intro,
          cover: coverUrl,
          content,
          audio: audioUrl,
          keywords: keywords.split(",").map((keyword) => keyword.trim()),
          category,
          author: userId,
          readingTime,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      router.push(`/${data.slug}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Terminer le chargement
    }
  };

  return (
    <main className="articleCreation">
      <h2>
        Créer un article<span style={{ color: "var(--themeAccent)" }}>.</span>
      </h2>
      {error && <p style={{ color: "red" }}>Erreur : {error}</p>}
      {loading && <p>Chargement...</p>} {/* Afficher le statut de chargement */}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="formLine">
          <label htmlFor="title">Titre</label>
          <input
            id="title"
            type="text"
            placeholder="Mon titre d'article"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="formLine">
          <label htmlFor="intro">Introduction</label>
          <textarea
            id="intro"
            placeholder="<p>Ma super intro</p><p>Qui supporte l'HTML</p>"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="formLine">
          <label htmlFor="cover">Image de couverture</label>
          <input
            id="cover"
            type="file"
            accept=".png,.jpeg,.jpg,.webp"
            onChange={(e) => setCover(e.target.files[0])}
            required
          />
        </div>
        <div className="formLine">
          <label htmlFor="content">Contenu</label>
          <textarea
            id="content"
            placeholder="<h2>Mon super contenu</h2><p>Qui supporte l'HTML</p>"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="formLine">
          <label htmlFor="audio">Audio</label>
          <input
            id="audio"
            type="file"
            accept=".mp3"
            onChange={(e) => setAudio(e.target.files[0])}
            required
          />
        </div>
        <div className="formLine">
          <label htmlFor="keywords">Mots clés</label>
          <input
            id="keywords"
            type="text"
            placeholder="Stoïcisme, Marcus Aurelius"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            required
          />
        </div>
        <div className="formLine">
          <label htmlFor="category">Catégorie</label>
          <select
            id="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            required
          >
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))
            ) : (
              <option disabled>Chargement...</option>
            )}
          </select>
        </div>
        <button type="submit">
          Créer{" "}
          <svg
            alt="Arrow"
            className="ctaArrow"
            width="79"
            height="30"
            viewBox="0 0 79 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M77.5815 20.3378C78.5578 19.3615 78.5578 17.7786 77.5815 16.8023L61.6716 0.892399C60.6953 -0.0839119 59.1124 -0.0839119 58.1361 0.892399C57.1597 1.86871 57.1597 3.45162 58.1361 4.42793L72.2782 18.5701L58.1361 32.7122C57.1597 33.6885 57.1597 35.2714 58.1361 36.2477C59.1124 37.224 60.6953 37.224 61.6716 36.2477L77.5815 20.3378ZM0.813721 21.0701H75.8137V16.0701H0.813721V21.0701Z"></path>
          </svg>
        </button>
      </form>
    </main>
  );
}
