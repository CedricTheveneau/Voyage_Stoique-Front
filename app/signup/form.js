"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Formulaire d'inscription pour la création d'un compte utilisateur.
 * Permet à l'utilisateur de s'inscrire en fournissant un pseudo, une adresse e-mail,
 * un mot de passe, une date de naissance et une option d'abonnement à la newsletter.
 * 
 * @returns {JSX.Element} Le formulaire d'inscription.
 */
export function Form() {
  /**
   * État pour le pseudo de l'utilisateur.
   * @type {string}
   */
 const [username, setUsername] = useState("");

 /**
   * État pour l'adresse e-mail de l'utilisateur.
   * @type {string}
   */
  const [email, setEmail] = useState("");

  /**
   * État pour le mot de passe de l'utilisateur.
   * @type {string}
   */
  const [password, setPassword] = useState("");

  /**
   * État pour la date de naissance de l'utilisateur.
   * @type {string}
   */
  const [birthday, setBirthday] = useState("");

  /**
   * État pour l'abonnement à la newsletter.
   * @type {boolean}
   */
  const [newsSubscription, setNewsSubscription] = useState(false);

  /**
   * Message de réponse pour afficher un message d'erreur ou de succès.
   * @type {string}
   */
  const [responseMessage, setResponseMessage] = useState("");

  /**
   * État de focus du champ mot de passe pour afficher les critères de sécurité.
   * @type {boolean}
   */
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  /**
   * Validité de la longueur du mot de passe (minimum 8 caractères).
   * @type {boolean}
   */
  const [isLengthValid, setIsLengthValid] = useState(false);

  /**
   * Validité de la présence d'une lettre majuscule dans le mot de passe.
   * @type {boolean}
   */
  const [hasUpperCase, setHasUpperCase] = useState(false);

  /**
   * Validité de la présence d'une lettre minuscule dans le mot de passe.
   * @type {boolean}
   */
  const [hasLowerCase, setHasLowerCase] = useState(false);

  /**
   * Validité de la présence d'un chiffre dans le mot de passe.
   * @type {boolean}
   */
  const [hasNumber, setHasNumber] = useState(false);

  /**
   * Validité de la présence d'un caractère spécial dans le mot de passe.
   * @type {boolean}
   */
  const [hasSpecialChar, setHasSpecialChar] = useState(false);

  const router = useRouter();

  /**
   * Gère les changements dans le champ mot de passe en vérifiant les critères de sécurité.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - L'événement de changement de mot de passe.
   */
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    setIsLengthValid(newPassword.length >= 8);
    setHasUpperCase(/[A-Z]/.test(newPassword));
    setHasLowerCase(/[a-z]/.test(newPassword));
    setHasNumber(/\d/.test(newPassword));
    setHasSpecialChar(/[!@#$%^&*()_+{}\[\]:;<>,.?/\\~\-]/.test(newPassword));
  };

  /**
   * Inscrit un nouvel utilisateur en envoyant les données du formulaire à l'API.
   * Si l'inscription réussit, l'utilisateur est redirigé vers la page de connexion.
   * 
   * @async
   * @function
   */
  const registerUser = async () => {
   if (!username || !email || !password || !birthday) return;

   try {
     const response = await fetch(
       `${process.env.NEXT_PUBLIC_API_GATEWAY_URI}/auth/register`,
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ username, email, password, birthday, newsSubscription }),
       }
     );

     if (!response.ok) {
       throw new Error(`HTTP error! status: ${response.status}`);
     }

     const data = await response.json();
     router.push("/login");
   } catch (error) {
     setResponseMessage("Erreur lors de l'inscription");
     console.error("Erreur lors de la requête de création de compte :", error);
   }
 };

 /**
   * Gère la soumission du formulaire en appelant la fonction d'inscription.
   * 
   * @param {React.FormEvent<HTMLFormElement>} e - L'événement de soumission du formulaire.
   */
  const handleSubmit = (e) => {
   e.preventDefault();
   registerUser();
 };

 return (
  <form onSubmit={handleSubmit}>
   {responseMessage && <p>{responseMessage}</p>}
        <div className="formLine">
      <label htmlFor="username" >Votre pseudo</label>
      <input
        id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <div className="formLine">
        <label htmlFor="email" >Votre adresse email</label>
        <input
        id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div className="formLine">
        <label htmlFor="password" >Votre mot de passe</label>
        <input
        id="password"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={handlePasswordChange}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
        />
       {isPasswordFocused &&  <ul>
          <li style={{ color: isLengthValid ? "#51C47D" : "#FC5D6A" }}>
            Au moins 8 caractères
          </li>
          <li style={{ color: hasUpperCase ? "#51C47D" : "#FC5D6A" }}>
            Au moins une lettre majuscule
          </li>
          <li style={{ color: hasLowerCase ? "#51C47D" : "#FC5D6A" }}>
            Au moins une lettre minuscule
          </li>
          <li style={{ color: hasNumber ? "#51C47D" : "#FC5D6A" }}>
            Au moins un chiffre
          </li>
          <li style={{ color: hasSpecialChar ? "#51C47D" : "#FC5D6A" }}>
            Au moins un caractère spécial
          </li>
        </ul>} 
        </div>
        <div className="formLine">
        <label htmlFor="birthday" >Votre date de naissance <br/><span>&#40;elle sera utilisée afin de vous protéger de contenu sensible si vous êtes mineur&#41;</span></label>
        <input
        id="birthday"
          type="date"
          placeholder="Date de naissance"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
        </div>
        <div className="formLine">
        <label htmlFor="newsSubscription" >Souhaitez-vous être abonné aux newsletters hebdomadaires ? <br/><span>&#40;Cochez la case si vous le souhaitez&#41;</span></label>
        <input
        id="newsSubscription"
          type="checkbox"
          value={newsSubscription}
          onChange={(e) => setNewsSubscription(e.target.checked)}
        />
        </div>
        <button type="submit">S&apos;inscrire <svg alt="Arrow" className="ctaArrow" width="79" height="30" viewBox="0 0 79 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M77.5815 20.3378C78.5578 19.3615 78.5578 17.7786 77.5815 16.8023L61.6716 0.892399C60.6953 -0.0839119 59.1124 -0.0839119 58.1361 0.892399C57.1597 1.86871 57.1597 3.45162 58.1361 4.42793L72.2782 18.5701L58.1361 32.7122C57.1597 33.6885 57.1597 35.2714 58.1361 36.2477C59.1124 37.224 60.6953 37.224 61.6716 36.2477L77.5815 20.3378ZM0.813721 21.0701H75.8137V16.0701H0.813721V21.0701Z"></path>
                        </svg></button>
      </form>
 )
}