import Link from "next/link";
import styles from "../page.module.css";

export default function ViewKard() {
  return (
    <div>
      <h1>Thinking Corner</h1>
      <div>
        <Link
          href={`/create`}
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Créez votre Kard ! <span>-&gt;</span>
          </h2>
          <p>Concevez votre Kard personnelle.</p>
        </Link>
      </div>
    </div>
  );
}