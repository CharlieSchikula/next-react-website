import Link from "next/link";
import styles from "@/styles/logo.module.css";

export default function Logo({ boxOn = false }) {
  return (
    <Link className={boxOn ? styles.box : styles.basic} href="/">
      <div>
        The second
        <br />
        best day
      </div>
    </Link>
  );
}
