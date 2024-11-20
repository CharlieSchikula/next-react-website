import Meta from "@/components/meta";
import Container from "@/components/container";
import Hero from "@/components/hero";
import PostBody from "@/components/post-body";
import Contact from "@/components/contact";
import {
  TwoColumn,
  TwoColumnMain,
  TwoColumnSidebar,
} from "@/components/two-column";
// import Accordion from "@/components/accordion";
import Image from "next/image";
import eyecatch from "@/images/about.jpg";

export default function About() {
  return (
    <Container>
      <Meta
        pageTitle="About"
        pageDescription="About development activities"
        pageImage={eyecatch.src}
        pageImageWidth={eyecatch.width}
        pageImageHeight={eyecatch.height}
      />

      <Hero title="About" subtitle="About development activities" />

      <figure>
        <Image
          src={eyecatch}
          alt="eyecatch"
          size="(min-width: 1152px) 1152px, 100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          priority
          placeholder="blur"
        />
      </figure>

      <TwoColumn>
        <TwoColumnMain>
          <PostBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Molestias ducimus ullam enim, laborum ea minus consequatur itaque
              eaque illo quisquam sequi necessitatibus rerum nulla tenetur
              temporibus quasi excepturi iusto voluptas!
            </p>

            <h2>適当な文章</h2>
            {/* <Accordion heading="テスト①">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Molestias ducimus ullam enim, laborum ea minus consequatur
                itaque eaque illo quisquam sequi necessitatibus rerum nulla
                tenetur temporibus quasi excepturi iusto voluptas!
              </p>
            </Accordion>

            <Accordion heading="テスト②">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Molestias ducimus ullam enim, laborum ea minus consequatur
                itaque eaque illo quisquam sequi necessitatibus rerum nulla
                tenetur temporibus quasi excepturi iusto voluptas!
              </p>
            </Accordion>

            <Accordion heading="テスト③">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Molestias ducimus ullam enim, laborum ea minus consequatur
                itaque eaque illo quisquam sequi necessitatibus rerum nulla
                tenetur temporibus quasi excepturi iusto voluptas!
              </p>
            </Accordion> */}
          </PostBody>
        </TwoColumnMain>
        <TwoColumnSidebar>
          <Contact />
        </TwoColumnSidebar>
      </TwoColumn>
    </Container>
  );
}
