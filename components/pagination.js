import styles from "@/styles/pagination.module.css";
import Link from "next/link";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function Pagination({
  prevText = "",
  prevUrl = "",
  nextText = "",
  nextUrl = "",
}) {
  return (
    <ul className={styles.flexContainer}>
      {prevText && prevUrl && (
        <li className={styles.prev}>
          <Link href={prevUrl} className={styles.iconText}>
            <FaAngleLeft color="var(--gray-25)" />
            {prevText}
          </Link>
        </li>
      )}
      {nextText && nextUrl && (
        <li className={styles.next}>
          <Link href={nextUrl} className={styles.iconText}>
            {nextText}
            <FaAngleRight color="var(--gray-25)" />
          </Link>
        </li>
      )}
    </ul>
  );
}
