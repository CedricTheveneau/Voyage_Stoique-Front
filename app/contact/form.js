"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../layout/GlobalContext";

export function Form() {

  const {contactSubjects, currentPath} = useGlobalContext();

 const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [subject, setSubject] = useState(contactSubjects[0]);

  const [content, setContent] = useState("");

  const [responseMessage, setResponseMessage] = useState(null);

  const router = useRouter();

  const sendEmail = async () => {
   if (!name || !email || !subject || !content) return;

   let emailContent = event.target.content.value;

    let formattedContent = emailContent.replace(/\n/g, "<br/>");
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

   try {
     const response = await fetch(
       `${process.env.NEXT_PUBLIC_API_GATEWAY_URI}/auth/contact`,
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ name, email, subject, content: formattedContent }),
       }
     );

     if (!response.ok) {
       throw new Error(`HTTP error! status: ${response.status}`);
     }

     const confirmation = await response.json();
     setResponseMessage(confirmation.message.message)
   } catch (error) {
     setResponseMessage("Erreur lors de l'envoi");
     console.error("Erreur lors de l'envoi de l'email de contact'", error);
   }
 };
 
  const handleSubmit = (e) => {
   e.preventDefault();
   sendEmail();
   setTimeout(() => {
    router.push(currentPath)
  }, 10000)
 };

 return (
  <>
  {responseMessage && responseMessage.title ? <><h3>{responseMessage.title}</h3><p>{responseMessage.message}</p></> : responseMessage && responseMessage.message ? <p>{responseMessage.message}</p> : ''}
  <form onSubmit={handleSubmit}>
   {responseMessage && <p>{responseMessage}</p>}
        <div className="formLine">
      <label htmlFor="name" >Votre nom</label>
      <input
        id="name"
          type="text"
          placeholder="Jean Dupont"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        </div>
        <div className="formLine">
        <label htmlFor="email" >Votre adresse email</label>
        <input
        id="email"
          type="email"
          placeholder="jean.dupont@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div className="formLine">
                      <label htmlFor="subject">Le sujet de votre demande</label>
                      <select
                        id="subject"
                        value={subject}
                        onChange={(e) => {
                          setSubject(e.target.value);
                        }}
                        required
                      >
                        {contactSubjects.map((subject, index) => (
                          <option key={index} value={subject}>
                            {subject.charAt(0).toUpperCase() + subject.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="formLine">
                      <label htmlFor="content">Votre message</label>
                      <textarea
                        id="content"
                        placeholder="Bonjour, je vous contacte aujoourd'hui concernant..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                      ></textarea>
                    </div>
        <button type="submit">Envoyer ma demande <svg alt="Arrow" className="ctaArrow" width="79" height="30" viewBox="0 0 79 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M77.5815 20.3378C78.5578 19.3615 78.5578 17.7786 77.5815 16.8023L61.6716 0.892399C60.6953 -0.0839119 59.1124 -0.0839119 58.1361 0.892399C57.1597 1.86871 57.1597 3.45162 58.1361 4.42793L72.2782 18.5701L58.1361 32.7122C57.1597 33.6885 57.1597 35.2714 58.1361 36.2477C59.1124 37.224 60.6953 37.224 61.6716 36.2477L77.5815 20.3378ZM0.813721 21.0701H75.8137V16.0701H0.813721V21.0701Z"></path>
                        </svg></button>
      </form>
      </>
 )
}