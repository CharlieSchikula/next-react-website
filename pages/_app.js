import { useEffect } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import Layout from "@/components/layout";
import Script from "next/script";
import * as gtag from "@/lib/gtag";

// Font Awesomeを使わずにReact iconsを使うことにしたため以下コメントアウト
// Font Awesome の設定
// import "@fortawesome/fontawesome-svg-core/styles.css";
// import { config } from "@fortawesome/fontawesome-svg-core";
// config.autoAddCss = false;

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag("js", new Date());
      
            gtag("config", "${gtag.GA_MEASUREMENT_ID}");
          `,
        }}
      />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
