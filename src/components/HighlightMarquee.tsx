import { useState } from "react";
import Marquee from "react-fast-marquee";
import "./HighlightMarquee.scss";

function isMarqueeComponent(value: unknown): value is typeof Marquee {
  return (
    typeof value === "function" ||
    (typeof value === "object" && value !== null && "$$typeof" in value)
  );
}

function resolveMarquee(value: unknown): typeof Marquee {
  if (isMarqueeComponent(value)) return value;
  if (
    value &&
    typeof value === "object" &&
    "default" in value &&
    isMarqueeComponent(value.default)
  ) {
    return value.default;
  }
  throw new TypeError("Unable to load react-fast-marquee");
}

const MarqueeComponent = resolveMarquee(Marquee);

type Memory = {
  _key: string;
  title: string;
  youtubeId: string;
};

export default function HighlightMarquee({ memories }: { memories: Memory[] }) {
  const [marqueeReady, setMarqueeReady] = useState(false);

  if (memories.length === 0) {
    return (
      <div className="highlight-video-list">
        <p className="highlight-empty">
          No highlight videos have been added for the featured year yet.
        </p>
      </div>
    );
  }

  return (
    <div className="highlight-video-list">
      <div className="highlight-fallback" hidden={marqueeReady}>
        {memories.map((memory) => (
          <div className="highlight-card" key={memory._key}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${memory.youtubeId}?rel=0`}
              title={memory.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        ))}
      </div>
      <MarqueeComponent
        className="highlight-marquee"
        autoFill
        pauseOnHover
        speed={35}
        gradient={false}
        onMount={() => setMarqueeReady(true)}
      >
        {memories.map((memory) => (
          <div className="highlight-card" key={memory._key}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${memory.youtubeId}?rel=0`}
              title={memory.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        ))}
      </MarqueeComponent>
    </div>
  );
}
