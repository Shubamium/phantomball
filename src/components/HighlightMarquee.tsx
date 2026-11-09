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

const videos = [
  { title: "Phantom Ball highlight 1", id: "7gUudkXcBek" },
  { title: "Phantom Ball highlight 2", id: "7gUudkXcBek" },
  { title: "Phantom Ball highlight 3", id: "7gUudkXcBek" },
  { title: "Phantom Ball highlight 4", id: "7gUudkXcBek" },
];

export default function HighlightMarquee() {
  const [marqueeReady, setMarqueeReady] = useState(false);

  return (
    <div className="highlight-video-list">
      <div className="highlight-fallback" hidden={marqueeReady}>
        {videos.map((video) => (
          <div className="highlight-card" key={video.id}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0`}
              title={video.title}
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
        {videos.map((video) => (
          <div className="highlight-card" key={video.id}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0`}
              title={video.title}
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
