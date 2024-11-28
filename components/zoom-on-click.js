import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/zoom-on-click.module.css";

export default function ZoomOnClick({ src, alt, width, height }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);

  return (
    <>
      <Image
        onClick={handleClick}
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 768px) 768px, 100vw"
        style={{
          width: "100%",
          height: "auto",
          cursor: "pointer",
        }}
      />
      {isOpen && (
        <div onClick={handleClick} className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <Image
              src={src}
              alt="拡大画像"
              width={width || 600}
              height={height || 400}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
