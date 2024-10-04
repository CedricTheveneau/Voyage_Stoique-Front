import Image from "next/image";
import Link from "next/link";
// const apiGateway = process.env.NEXT_PUBLIC_API_GATEWAY_URI;

export default function Home() {
  return (
    <main>
      <div className="hero">
        <Image src="/heroBg.png" width="1728" height="1117" alt="Latest article's cover"/>
      </div>
    </main>
  );
}