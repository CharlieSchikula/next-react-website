import Image from "next/image";
import NoImage from "@/public/noimage.png";
import styles from "@/styles/blogcard.module.css";

export default function BlogCard({ cardData }) {
  const blank = cardData.url.indexOf(process.env.NEXT_PUBLIC_DOMAIN) === -1;
  const blankProp = blank
    ? {
        target: "_blank",
      }
    : {};

  const cardDataTitle = cardData.title ? cardData.title : "No title available";

  const shortDescription = cardData.description
    ? cardData.description.length > 80
      ? cardData.description.substring(0, 80) + "..."
      : cardData.description
    : "No description available";

  return (
    <div className={styles.blogCard}>
      <a href={cardData.url} {...blankProp} className={styles.blogCardLink}>
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <Image
              src={cardData.image ? cardData.image : NoImage}
              alt={cardData.title}
              fill
              className={styles.blogCardImage}
            />
          </div>
        </div>
        <div className={styles.textContainer}>
          <div className={styles.blogCardTitle}>{cardDataTitle}</div>
          <div className={styles.blogCardDescription}>{shortDescription}</div>
          <div className={styles.blogCardUrl}>{cardData.url}</div>
        </div>
      </a>
    </div>
  );
}
