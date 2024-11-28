import styles from "@/styles/social.module.css";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Social({ iconSize = "initial" }) {
  return (
    <ul className={styles.list} style={{ "--icon-size": iconSize }}>
      <li>
        <a href="https://github.com/CharlieSchikula">
          <FaGithub />
          <span className="sr-only">Github</span>
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/shun-s-foobar/">
          <FaLinkedin />
          <span className="sr-only">LinkedIn</span>
        </a>
      </li>{" "}
    </ul>
  );
}
