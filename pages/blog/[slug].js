import { JSDOM } from "jsdom";
import { getPostBySlug, getAllPosts } from "lib/api";
import { extractText } from "@/lib/extract-text";
import { prevNextPost } from "@/lib/prev-next-post";
import Meta from "@/components/meta";
import Container from "@/components/container";
import PostHeader from "@/components/post-header";
import PostBody from "@/components/post-body";
import {
  TwoColumn,
  TwoColumnMain,
  TwoColumnSidebar,
} from "@/components/two-column";
import ConvertBody from "@/components/convert-body";
import PostCategories from "@/components/post-categories";
import Pagination from "@/components/pagination";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import { getImageBuffer } from "@/lib/getImageBuffer";

// ローカルの代替アイキャッチ画像をインポート
import { eyecatchLocal } from "@/lib/constants";

export default function Post({
  title,
  publish,
  content,
  eyecatch,
  categories,
  description,
  prevPost,
  nextPost,
  cardDatas, // ここを追加
}) {
  return (
    <Container>
      <Meta
        pageTitle={title}
        pageDescription={description}
        pageImage={eyecatch.url}
        pageImageWidth={eyecatch.width}
        pageImageHeight={eyecatch.height}
      />

      <article>
        <PostHeader title={title} subtitle="Blog Article" publish={publish} />

        <figure>
          <Image
            key={eyecatch.url}
            src={eyecatch.url}
            alt=""
            width={eyecatch.width}
            height={eyecatch.height}
            sizes="(max-width: 1152px) 1152px, 100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            priority
            placeholder="blur"
            blurDataURL={eyecatch.blurDataURL}
          />
        </figure>

        <TwoColumn>
          <TwoColumnMain>
            <PostBody>
              <ConvertBody contentHTML={content} cardDatas={cardDatas} />
            </PostBody>
          </TwoColumnMain>
          <TwoColumnSidebar>
            <PostCategories categories={categories} />
          </TwoColumnSidebar>
        </TwoColumn>

        <Pagination
          prevText={prevPost.title}
          prevUrl={`/blog/${prevPost.slug}`}
          nextText={nextPost.title}
          nextUrl={`/blog/${nextPost.slug}`}
        />
      </article>
    </Container>
  );
}

export async function getStaticPaths() {
  const allSlugs = await getAllPosts(5);

  return {
    paths: allSlugs.map(({ slug }) => `/blog/${slug}`),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const slug = context.params.slug;

  const post = await getPostBySlug(slug);
  if (!post) {
    return { notFound: true };
  } else {
    const description = extractText(post.content);
    const eyecatch = post.eyecatch ?? eyecatchLocal;

    const imageBuffer = await getImageBuffer(eyecatch.url);
    const { base64 } = await getPlaiceholder(imageBuffer);
    eyecatch.blurDataURL = base64;

    const allSlugs = await getAllPosts();
    const [prevPost, nextPost] = prevNextPost(allSlugs, slug);

    // ここから追加
    const links = (post.content.match(/href="([^"]*)"/g) || []).map((href) => {
      const url = href.replace('href="', "").replace('"', "");
      return {
        url: url.startsWith("http")
          ? url
          : `${process.env.NEXT_PUBLIC_DOMAIN}${url}`,
      };
    });

    const cardDatas = await Promise.all(
      links.map(async (link) => {
        try {
          const response = await fetch(link.url);
          const text = await response.text();
          const dom = new JSDOM(text);
          const metas = dom.window.document.querySelectorAll("meta");
          const metaData = {
            url: link.url,
            title: "",
            description: "",
            image: "",
          };
          metas.forEach((meta) => {
            if (meta.getAttribute("property") === "og:title") {
              metaData.title = meta.getAttribute("content");
            }
            if (meta.getAttribute("property") === "og:description") {
              metaData.description = meta.getAttribute("content") || null; // Ensure description is not undefined
            }
            if (meta.getAttribute("property") === "og:image") {
              metaData.image = meta.getAttribute("content");
            }
          });
          return metaData;
        } catch (e) {
          console.log(e);
          return undefined;
        }
      })
    );

    const filteredCardDatas = cardDatas.filter((data) => data !== undefined);

    return {
      props: {
        title: post.title,
        publish: post.publishDate,
        content: post.content,
        eyecatch: eyecatch,
        categories: post.categories,
        description: description,
        prevPost: prevPost,
        nextPost: nextPost,
        cardDatas: filteredCardDatas,
      },
    };
  }
}
