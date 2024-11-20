import parse from "html-react-parser";
import Image from "next/image";

export default function ConvertBody({ contentHTML }) {
  const contentReact = parse(contentHTML, {
    replace: (node) => {
      if (node.name === "img") {
        const { src, alt, width, height } = node.attribs;
        return (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(max-width: 768px) 768px, 100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        );
      }
    },
  });
  return <>{contentReact}</>;
}
