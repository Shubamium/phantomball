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
  name: string;
  avatar: string;
  text: string;
};

type Memory = {
  title: string;
  youtubeId: string;
};

type YearHighlight = {
  year: number;
  eventTitle: string;
  title: string;
  description: string;
  image: string;
  people: Comment[];
  memories: Memory[];
};

const description =
  "The Phantom Ball of Auld Lang Syne is a celebratory gathering of friends and mutuals who enjoy gaming and bringing communities together.";
function placeholderImage(seed: string, width: number, height: number) {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

function makeMemories(year: number): Memory[] {
  return Array.from({ length: 5 }, (_, index) => ({
    title: `Phantom Ball ${year} memory ${index + 1}`,
    youtubeId: "7gUudkXcBek",
  }));
}

const yearHighlights: YearHighlight[] = [
  { year: 2026, title: '"The Celestial Masquerade"' },
  { year: 2027, title: '"A Night Among the Stars"' },
  { year: 2028, title: '"The Enchanted Ballroom"' },
  { year: 2029, title: '"Midnight in the Grand Hall"' },
].map(({ year, title }) => ({
  year,
  eventTitle: `Phantom Ball ${year}`,
  title,
  description,
  image: placeholderImage(`phantom-ball-main-${year}`, 1400, 900),
  people: Array.from({ length: 6 }, (_, index) => ({
    name: `person_name_${index + 1}`,
    avatar: placeholderImage(`phantom-person-${year}-${index + 1}`, 160, 160),
    text: description,
  })),
  memories: makeMemories(year),
}));

export default function HighlightsPage() {
  const [selectedYear, setSelectedYear] = useState(yearHighlights[0].year);
  const selectedHighlight = yearHighlights.find(
    (highlight) => highlight.year === selectedYear,
  );

  if (!selectedHighlight) {
    throw new Error(`No Phantom Ball highlights found for ${selectedYear}`);
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
              {yearHighlights.map((highlight) => (
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
          <img
            className="main-image"
            src={selectedHighlight.image}
            alt={`${selectedHighlight.eventTitle} celebration`}
          />
        </div>

        <aside
          className="highlight-sidebar"
          aria-label="Event details and comments"
        >
          <div className="event-details">
            <img
              className="event-avatar"
              src={placeholderImage(
                `phantom-event-avatar-${selectedYear}`,
                180,
                180,
              )}
              alt=""
            />
            <h1>{selectedHighlight.eventTitle}</h1>
            <h2>{selectedHighlight.title}</h2>
            <img className="fancy-divider" src="/d/hr_fancy.png" alt="" />
            <p>{selectedHighlight.description}</p>
          </div>

          <ul className="comment-list" aria-label="Event comments">
            {selectedHighlight.people.map((person) => (
              <li
                className="comment-card"
                key={`${selectedYear}-${person.name}`}
              >
                <img
                  src="/d/comment-side.png"
                  alt=""
                  className="comment-side"
                />
                <div className="img-part">
                  <img
                    className="comment-avatar"
                    src={person.avatar}
                    alt=""
                    loading="lazy"
                  />
                  <img
                    className="comment-ornament"
                    src="/d/hr_fancy.png"
                    alt=""
                  />
                </div>
                <div className="comment-content">
                  <h3>@{person.name}</h3>
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
          <p>{selectedHighlight.description}</p>
        </div>
        <MarqueeComponent
          key={selectedYear}
          className="memories-marquee"
          autoFill
          pauseOnHover
          speed={35}
          gradient={false}
        >
          {selectedHighlight.memories.map((memory, index) => (
            <div
              className="memory-card"
              key={`${selectedYear}-${memory.title}-${index}`}
            >
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
      </section>
    </div>
  );
}
