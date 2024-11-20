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
              <ConvertBody contentHTML={content} />
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
      },
    };
  }
}