import "@/styles/globals.css";
import Layout from "@/components/layout";

// Font Awesomeを使わずにReact iconsを使うことにしたため以下コメントアウト
// Font Awesome の設定
// import "@fortawesome/fontawesome-svg-core/styles.css";
// import { config } from "@fortawesome/fontawesome-svg-core";
// config.autoAddCss = false;

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
