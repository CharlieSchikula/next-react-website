import parse from "html-react-parser";
import BlogCard from "@/components/blogcard";
import ZoomOnClick from "@/components/zoom-on-click";

export default function ConvertBody({ contentHTML, cardDatas }) {
  const contentReact = parse(contentHTML, {
    replace: (node) => {
      if (node.name === "img") {
        const { src, alt, width, height } = node.attribs;
        return (
          <ZoomOnClick src={src} alt={alt} width={width} height={height} />
        );
      }
      if (node.name === "a") {
        const { href } = node.attribs;
        const cardData = cardDatas.find((data) => data.url === href);
        if (cardData) {
          return <BlogCard key={`${href}-card`} cardData={cardData} />;
        }
        // If no cardData is found, return the original link
        return (
          <a
            key={href}
            href={href}
            style={{
              color: "blue",
              textDecoration: "underline",
            }}
            target="_blank"
          >
            {node.children[0].data}
          </a>
        );
      }

      return node;
    },
  });

  return <>{contentReact}</>;
}
