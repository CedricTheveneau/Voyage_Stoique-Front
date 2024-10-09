"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from '../layout/GlobalContext';
const apiGateway = process.env.NEXT_PUBLIC_API_GATEWAY_URI;

export default function CreateArticle() {
  const { isAuthenticated, userId, userRole} = useGlobalContext();
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [cover, setCover] = useState("");
  const [content, setContent] = useState("");
  const [audio, setAudio] = useState("");
  const [keywords, setKeywords] = useState("");
  const [category, setCategory] = useState("");
  const [readingTime, setReadingTime] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || userRole !== "admin") {
      router.push("/");
    }
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!isAuthenticated || userRole !== "admin") {
      setError("Vous n'êtes pas autorisé à créer un article");
      return;
    }

    try {
      const response = await fetch(`${apiGateway}/articles/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          title,
          intro,
          cover,
          content,
          audio,
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
      router.push(`/${data._id}`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="articleCreation">
      <h2>Créer un article</h2>
      {error && <p style={{ color: "red" }}>Erreur : {error}</p>}
      <form onSubmit={handleSubmit}>
      <div className="formLine">
      <label htmlFor="title" >Titre</label>
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
        <label htmlFor="intro" >Introduction</label>
        <input
        id="intro"
          type="text"
          placeholder="<p>Ma super intro</p><p>Qui supporte l'HTML</p>"
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          required
        />
        </div>
        <div className="formLine">
        <label htmlFor="cover" >Image de couverture</label>
        <input
        id="cover"
          type="text"
          placeholder="https://url-de-mon-image.png"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
          required
        />
        </div>
        <div className="formLine">
        <label htmlFor="content" >content</label>
       <input
       id="content"
          type="text"
          placeholder="<h2>Mon super contenu</h2><p>Qui supporte l'HTML</p>"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        </div>
        <div className="formLine">
        <label htmlFor="audio" >Audio</label>
        <input
        id="audio"
          type="text"
          placeholder="https://url-de-mon-audio.mp3"
          value={audio}
          onChange={(e) => setAudio(e.target.value)}
          required
        />
        </div>
        <div className="formLine">
        <label htmlFor="keywords" >Mots clés</label>
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
        <label htmlFor="category" >Catégorie</label>
        <input
        id="category"
          type="text"
          placeholder="admin"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        </div>
        <div className="formLine">
        <label htmlFor="readingTime" >Temps de lecture <br/><span>&#40;en minutes&#41;</span></label>
        <input
        id="readingTime"
          type="number"
          placeholder="3"
          value={readingTime}
          onChange={(e) => setReadingTime(e.target.value)}
        />
        </div>
        <button type="submit">Créer <svg alt="Arrow" className="ctaArrow" width="79" height="30" viewBox="0 0 79 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M77.5815 20.3378C78.5578 19.3615 78.5578 17.7786 77.5815 16.8023L61.6716 0.892399C60.6953 -0.0839119 59.1124 -0.0839119 58.1361 0.892399C57.1597 1.86871 57.1597 3.45162 58.1361 4.42793L72.2782 18.5701L58.1361 32.7122C57.1597 33.6885 57.1597 35.2714 58.1361 36.2477C59.1124 37.224 60.6953 37.224 61.6716 36.2477L77.5815 20.3378ZM0.813721 21.0701H75.8137V16.0701H0.813721V21.0701Z"></path>
                        </svg></button>
      </form>
    </main>
  );
}