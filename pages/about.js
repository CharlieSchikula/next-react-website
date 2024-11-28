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
import Accordion from "@/components/accordion";
import Image from "next/image";
import eyecatch from "@/images/about.jpg";

export default function About() {
  return (
    <Container>
      <Meta
        pageTitle="About"
        pageDescription="About me"
        pageImage={eyecatch.src}
        pageImageWidth={eyecatch.width}
        pageImageHeight={eyecatch.height}
      />

      <Hero title="About" subtitle="About me" />

      <figure>
        <Image
          src={eyecatch}
          alt="eyecatch"
          size="(min-width: 1024px) 512px, (min-width: 768px) 50vw, 100vw"
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
            <div>
              猫好きの未経験エンジニアが、個人的な学びをアウトプットしていくサイト。
              <br />
              ポートフォリオの一環として作成したため、現時点ではアウトプットが少ないが、今後更新していく予定。
              <br />
              アコーディオンメニューを作りたかったので、以下で自己紹介する。
            </div>

            <h2>プロフィール</h2>
            <Accordion heading="自己紹介">
              <div>
                34歳男、千葉在住、既婚、猫2匹（ロシアンブルー、ブリティッシュショートヘア）を飼っている。
                猫から癒しをもらいながら、日々楽しんで生きている。
              </div>
            </Accordion>

            <Accordion heading="過去の経歴について">
              <div>
                <ol style={{ paddingLeft: 0, listStyleType: "none" }}>
                  <li>（1社目）環境エネルギーコンサルタント</li>
                  <li>（2社目）人材育成・組織開発コンサルタント</li>
                  <li>
                    （3社目）SaaSスタートアップの営業チームリーダー・新規事業開発
                  </li>
                  <li>
                    （4社目）ヘルスケアスタートアップの研究開発マネージャー・新規事業開発
                  </li>
                </ol>
                という一見バラバラな経歴を辿ってきており、ベースとしては問題解決やプロジェクトマネジメントのスキルを活かして仕事をしてきた。
                <br />
                諸事情あって仕事を辞めて数ヶ月間の離職期間があったが、新しいことを学ぶのが好きなこと、また34歳になり未経験で新しい領域に飛び込む難易度が今後上がっていくと考えたことから、このタイミングでエンジニア転職を決意した。
              </div>
            </Accordion>

            <Accordion heading="スキルセット">
              <div>
                2024.11現在
                <ul
                  style={{
                    paddingLeft: 0,
                    listStyleType: "none",
                  }}
                >
                  <li style={{ marginTop: 10 }}>【ビジネススキル】</li>
                  <ul>
                    <li>クリティカルシンキング（法人研修講師の経験あり）</li>
                    <li>問題解決</li>
                    <li>ファシリテーション</li>
                    <li>プレゼンテーション</li>
                    <li>プロジェクトマネジメント</li>
                  </ul>

                  <li style={{ marginTop: 10 }}>【エンジニアスキル】</li>
                  <ul>
                    <li>
                      SaaSプロダクトの要件定義（ユーザーインタビュー、ユーザーストーリー作成）
                    </li>
                    <li>プログラミング（いずれも初級レベル）</li>
                    <ul>
                      <li>HTML, CSS, JavaScript（React, Next.js）</li>
                      <li>Python</li>
                      <li>SQL（PostgreSQL）</li>
                    </ul>
                  </ul>
                </ul>
              </div>
            </Accordion>
          </PostBody>
        </TwoColumnMain>
        <TwoColumnSidebar>
          <Contact />
        </TwoColumnSidebar>
      </TwoColumn>
    </Container>
  );
}
