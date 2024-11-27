import styles from "@/styles/contact.module.css";
import Social from "@/components/social";

export default function Contact() {
  return (
    <div className={styles.stack}>
      <p className={styles.heading}>Contact</p>
      <Social iconSize="30px" />
    </div>
  );
}
