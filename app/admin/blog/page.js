import Link from "next/link";

export default function ViewKard() {
  return (
    <div>
      <h1>Admin blog</h1>
      <div>
        <Link
          href={`/create`}
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