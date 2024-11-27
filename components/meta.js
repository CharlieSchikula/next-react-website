import Head from "next/head";
import { useRouter } from "next/router";

// サイトに関する情報
import { siteMeta } from "@/lib/constants"; // サイトのメタ情報
const { siteTitle, siteDescription, siteUrl, siteLocale, siteType, siteIcon } =
  siteMeta;

// 汎用OGP画像
import siteImg from "@/images/ogp.png";

export default function Meta({
  pageTitle,
  pageDescription,
  pageImg,
  pageImgWidth,
  pageImgHeight,
}) {
  // ページタイトルの設定
  const title = pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle;

  // ページのディスクリプションの設定
  const desc = pageDescription ?? siteDescription;

  // ページのURLの設定
  const router = useRouter();
  const url = `${siteUrl}${router.asPath}`;

  // ページのOGP画像の設定
  const img = pageImg || siteImg.src;
  const imgW = pageImgWidth || siteImg.width;
  const imgH = pageImgHeight || siteImg.height;
  const imgUrl = img.startsWith("http") ? img : `${siteUrl}${img}`;

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />

      <meta name="description" content={desc} />
      <meta property="og:description" content={desc} />

      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />

      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:type" content={siteType} />
      <meta property="og:locale" content={siteLocale} />

      <link rel="icon" href={siteIcon} />
      <link rel="apple-touch-icon" href={siteIcon} />

      <meta property="og:image" content={imgUrl} />
      <meta property="og:image.width" content={imgW} />
      <meta property="og:image.height" content={imgH} />
    </Head>
  );
}
