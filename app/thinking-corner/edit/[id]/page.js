"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import styles from "../../../page.module.css";

export default function EditCard() {
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
  const [kardData, setKardData] = useState(null);
  const [error, setError] = useState(null);
  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) {
      setError("Token non trouvé dans le localStorage");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/kards/${id}`, {
        method: "PUT",
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

  useEffect(() => {
    const fetchKardData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.token) {
        setError("Token non trouvé dans le localStorage");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/kards/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setKardData(data);
        setProfilePic(data.profilePic);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setJob(data.job);
        setCurrentCompany(data.currentCompany);
        setCurrentCompanyAdress(data.currentCompanyAdress);
        setSkills(data.skills.join(", "));
        setQrCode(data.qrCode);
        setContactEmail(data.contactEmail);
        setContactTel(data.contactTel);
        setCtaText(data.ctaText);
        setCtalink(data.ctalink);
      } catch (error) {
        setError(error.message);
      }
    };

    if (id) {
      fetchKardData();
    }
  }, [pathname, id]);

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  if (!kardData) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h1>Modifier une carte</h1>
      {error && <p style={{ color: "red" }}>Erreur : {error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
          required
        />
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          required
        />
        <input
          type="text"
          value={currentCompany}
          onChange={(e) => setCurrentCompany(e.target.value)}
        />
        <input
          type="text"
          value={currentCompanyAdress}
          onChange={(e) => setCurrentCompanyAdress(e.target.value)}
        />
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <input
          type="text"
          value={qrCode}
          onChange={(e) => setQrCode(e.target.value)}
        />
        <input
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          value={contactTel}
          onChange={(e) => setContactTel(e.target.value)}
          required
        />
        <input
          type="text"
          value={ctaText}
          onChange={(e) => setCtaText(e.target.value)}
        />
        <input
          type="url"
          value={ctalink}
          onChange={(e) => setCtalink(e.target.value)}
          required
        />
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
}