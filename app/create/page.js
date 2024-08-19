"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCard() {
  const [profilePic, setProfilePic] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [job, setJob] = useState("");
  const [currentCompany, setCurrentCompany] = useState("");
  const [currentCompanyAdress, setCurrentCompanyAdress] = useState("");
  const [skills, setSkills] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactTel, setContactTel] = useState("");
  const [ctaText, setCtaText] = useState("Let's work together !");
  const [ctalink, setCtalink] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) {
      setError("Token non trouvé dans le localStorage");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/kards/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          profilePic,
          firstName,
          lastName,
          job,
          currentCompany,
          currentCompanyAdress,
          skills: skills.split(",").map((skill) => skill.trim()),
          qrCode,
          contactEmail,
          contactTel,
          ctaText,
          ctalink,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      router.push(`/kard/${data._id}`); // Redirection vers la page de la Kard créée
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Créer une carte</h1>
      {error && <p style={{ color: "red" }}>Erreur : {error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="https://john-doe-profile-pic.png"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="John"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Doe"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Développeur"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="John Doe inc."
          value={currentCompany}
          onChange={(e) => setCurrentCompany(e.target.value)}
        />
        <input
          type="text"
          placeholder="123 Allée des Moulins"
          value={currentCompanyAdress}
          onChange={(e) => setCurrentCompanyAdress(e.target.value)}
        />
        <input
          type="text"
          placeholder="NextJS, React, NodeJS (séparés d'une virgule)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <input
          type="text"
          placeholder="https://my-awesome-qr-code.png"
          value={qrCode}
          onChange={(e) => setQrCode(e.target.value)}
        />
        <input
          type="email"
          placeholder="johndoe.pro@email.com"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="06 12 34 56 78"
          value={contactTel}
          onChange={(e) => setContactTel(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Discover my portfolio !"
          value={ctaText}
          onChange={(e) => setCtaText(e.target.value)}
        />
        <input
          type="url"
          placeholder="https://my-awesome-portfolio.com"
          value={ctalink}
          onChange={(e) => setCtalink(e.target.value)}
          required
        />
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}