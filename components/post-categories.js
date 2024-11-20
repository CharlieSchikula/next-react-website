import styles from "@/styles/post-categories.module.css";
import Link from "next/link";
import { FaFolderOpen } from "react-icons/fa";

export default function PostCategories({ categories }) {
  return (
    <div className={styles.flexContainer}>
      <h3 className={styles.heading}>
        <FaFolderOpen />
        <span className="sr-only">Categories</span>
      </h3>
      <ul className={styles.list}>
        {categories.map(({ name, slug }) => (
          <li key={slug}>
            <Link href={`/blog/category/${slug}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
