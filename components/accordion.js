import styles from "@/styles/accordion.module.css";
import { FaCircleChevronDown } from "react-icons/fa";

export default function Accordion({ heading, children }) {
  return (
    <div className={styles.open}>
      <h3 className={styles.heading}>
        <button>
          {heading}
          <FaCircleChevronDown className={styles.icon} />
        </button>
      </h3>
      <div className={styles.text}>
        <div className={styles.textInner}>{children}</div>
      </div>
    </div>
  );
}
