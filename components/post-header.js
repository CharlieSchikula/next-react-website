import styles from "@/styles/post-header.module.css";
import ConvertDate from "@/components/convert-date";
import { FaClock } from "react-icons/fa";

export default function PostHeader({ title, subtitle, publish = "" }) {
  return (
    <div className={styles.stack}>
      <div className={styles.subtitle}>{subtitle}</div>
      <h1 className={styles.title}>{title}</h1>
      {publish && (
        <div className={styles.publish}>
          <FaClock color="var(--gray-25)" />
          <ConvertDate dateISO={publish} />
        </div>
      )}
    </div>
  );
}
