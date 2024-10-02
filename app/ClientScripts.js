"use client";

import Script from "next/script";

export default function ClientScripts() {
  return (
    <>
      <Script
        src="https://js.stripe.com/v3/buy-button.js"
        strategy="lazyOnload"
      />

      <Script
        src="../lightning-ui.js"
        strategy="lazyOnload"
      />
    </>
  );
}