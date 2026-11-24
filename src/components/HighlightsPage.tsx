import { useState } from "react";
import Marquee from "react-fast-marquee";
import "./HighlightsPage.scss";

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

type Comment = {
  _key: string;
  name: string;
  avatarUrl?: string;
  text: string;
};

type Memory = {
  _key: string;
  title: string;
  youtubeId: string;
};

type YearHighlight = {
  _id: string;
  year: number;
  eventTitle: string;
  title: string;
  description: string;
  imageUrl?: string;
  eventAvatarUrl?: string;
  people: Comment[];
  memories: Memory[];
};

export default function HighlightsPage({
  highlights,
}: {
  highlights: YearHighlight[];
}) {
  const [selectedYear, setSelectedYear] = useState<number | null>(
    highlights[0]?.year ?? null,
  );
  const selectedHighlight = highlights.find(
    (highlight) => highlight.year === selectedYear,
  );

  if (!selectedHighlight) {
    return (
      <div className="highlights-page">
        <p className="highlights-empty">
          No year highlights have been published yet.
        </p>
      </div>
    );
  }

  return (
    <div className="highlights-page">
      <section
        className="year-showcase"
        aria-label={`${selectedYear} highlights`}
      >
        <div className="showcase-main">
          <div className="showcase-toolbar">
            <div
              className="year-switcher"
              role="group"
              aria-label="Select event year"
            >
              {highlights.map((highlight) => (
                <button
                  className="year-button"
                  type="button"
                  key={highlight.year}
                  aria-pressed={selectedYear === highlight.year}
                  onClick={() => setSelectedYear(highlight.year)}
                >
                  {highlight.year}
                </button>
              ))}
            </div>
            <p className="event-label">
              {selectedHighlight.title}
              <span>{selectedHighlight.year}</span>
            </p>
          </div>
          {selectedHighlight.imageUrl ? (
            <img
              className="main-image"
              src={selectedHighlight.imageUrl}
              alt={`${selectedHighlight.eventTitle} celebration`}
            />
          ) : (
            <div
              className="main-image image-placeholder"
              role="img"
              aria-label={`${selectedHighlight.eventTitle} image not available`}
            />
          )}
        </div>

        <aside
          className="highlight-sidebar"
          aria-label="Event details and comments"
        >
          <div className="event-details">
            {selectedHighlight.eventAvatarUrl && (
              <img
                className="event-avatar"
                src={selectedHighlight.eventAvatarUrl}
                alt=""
              />
            )}
            <h1>{selectedHighlight.eventTitle}</h1>
            <h2>{selectedHighlight.title}</h2>
            <img className="fancy-divider" src="/d/hr_fancy.png" alt="" />
            <p>{selectedHighlight.description}</p>
          </div>

          <ul className="comment-list" aria-label="Event comments">
            {selectedHighlight.people.map((person) => (
              <li className="comment-card" key={person._key}>
                <img
                  src="/d/comment-side.png"
                  alt=""
                  className="comment-side"
                />
                <div className="img-part">
                  {person.avatarUrl && (
                    <img
                      className="comment-avatar"
                      src={person.avatarUrl}
                      alt=""
                      loading="lazy"
                    />
                  )}
                  <img
                    className="comment-ornament"
                    src="/d/hr_fancy.png"
                    alt=""
                  />
                </div>
                <div className="comment-content">
                  <h3>{person.name}</h3>
                  <p>{person.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section
        className="memories-section"
        aria-label={`${selectedYear} memories`}
      >
        <div className="memories-intro">
          <h2>Memories</h2>
          <img src="/d/hr_fancy.png" alt="" />
          <p> Descriptions here</p>
        </div>
        {selectedHighlight.memories.length > 0 ? (
          <MarqueeComponent
            key={selectedYear}
            className="memories-marquee"
            autoFill
            pauseOnHover
            speed={35}
            gradient={false}
          >
            {selectedHighlight.memories.map((memory) => (
              <div className="memory-card" key={memory._key}>
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${memory.youtubeId}`}
                  title={memory.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </MarqueeComponent>
        ) : (
          <p className="memories-empty">
            No memory videos have been added for this year yet.
          </p>
        )}
      </section>
    </div>
  );
}
