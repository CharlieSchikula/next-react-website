import Image from "next/image";
import NoImage from "@/public/noimage.png";

export default function BlogCard({ cardData }) {
  const blank = cardData.url.indexOf(process.env.NEXT_PUBLIC_DOMAIN) === -1;
  const blankProp = blank
    ? {
        target: "_blank",
      }
    : {};

  return (
    <div>
      <a href={cardData.url} {...blankProp}>
        <div>
          <Image
            src={cardData.image ? cardData.image : NoImage}
            alt={cardData.title}
            layout="responsive"
            width={500}
            height={300}
          />
        </div>
        <div>
          <div>{cardData.title}</div>
        </div>
      </a>
    </div>
  );
}
