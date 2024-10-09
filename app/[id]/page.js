"use client"
import Link from "next/link";
import Image from "next/image"
import {useEffect, useState} from "react";
import { useGlobalContext } from '../layout/GlobalContext';
const apiGateway = process.env.NEXT_PUBLIC_API_GATEWAY_URI;


export default function ViewArticle({params}) {
const { userToken} = useGlobalContext();
  
const {id} = params;
const [article, setArticle] = useState("");
const [author, setAuthor] = useState(null);
const [error, setError] = useState("");

// useEffect(() => {
//   const user = JSON.parse(localStorage.getItem("user"));
//     if (!isAuthenticated || userRole !== "admin") {
//       setError("Vous n'êtes pas autorisé à créer un article");
//       return;
//     }
//   const fetchArticle = async () => {
//     try {
//       const response = await fetch(`${apiGateway}/articles/${id}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userToken}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const articleData = await response.json();
//       console.log(articleData);
      
//       setArticle(articleData);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   fetchArticle();
// }, [id]);

// useEffect(() => {
//   const fetchAuthor = async () => {
//     try {
//       const response = await fetch(`${apiGateway}/auth/${article.author}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const userData = await response.json();
//       setAuthor(userData.user);
//     } catch (error) {
//       setError(error.message);
//     }
//   };
//   if (article.author) {
//   fetchAuthor();
//   }
// }, [article]);

  return (
    <main>
      {error && <p>{error}</p>}
      <p>Article numéro {id}</p>
      {/* <div className="hero article">
        <Image  src={article.cover} width="1728" height="1117" alt="The article's cover"/>
        <div className="searchData"><span className="articleCategory">{article.category}</span> | {article.keywords.map((keyword, index) => (
  <span key={index} className="keyword">{keyword}</span>
))}</div>
        <div className="articleInfo">
          <h2>{article.title}</h2>
          {article.intro}
          <div className="articleMetadatas">
            <div className="firstLine"><p>{article.publishDate}</p> • <a href={`/profile/${article.author}`}>{author}</a> • <p>Lecture de {article.readingTime} {article.readingTime <= 1 ? "minute" : "minutes"}</p></div>
            <div className="secondLine"><form method="POST"><button className="upvoteButton"><svg width="46" height="43" viewBox="0 0 46 43" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.1213 0.87868C23.9497 -0.292893 22.0503 -0.292893 20.8787 0.87868L1.7868 19.9706C0.615222 21.1421 0.615222 23.0416 1.7868 24.2132C2.95837 25.3848 4.85786 25.3848 6.02944 24.2132L23 7.24264L39.9706 24.2132C41.1421 25.3848 43.0416 25.3848 44.2132 24.2132C45.3848 23.0416 45.3848 21.1421 44.2132 19.9706L25.1213 0.87868ZM20 3L20 43L26 43L26 3L20 3Z" fill="#141414"/>
</svg>
</button></form> • <p>{article.upvotes.length}</p> • <p>{articleCommentsNumber ? {articleCommentsNumber} : article.comments.length}</p></div>
          </div>
        </div>
      </div>
      <div className="content">
      </div> */}
    </main>
  );
}