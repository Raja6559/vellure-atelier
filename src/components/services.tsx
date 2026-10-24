import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useHydrated } from "./use-hydrated";
const services = [
  {
    name: "Hair",
    note: "Shape, texture, a fresh perspective.",
    items: [
      [
        "Cut & Shape",
        "A considered cut, imagined around the way you like to wear your hair.",
      ],
      [
        "Texture & Movement",
        "An exploration of natural texture, lightness and shape.",
      ],
      [
        "Finish & Polish",
        "The small finishing details that bring a look together.",
      ],
    ],
  },
  {
    name: "Colour",
    note: "A change of tone. A new point of view.",
    items: [
      [
        "Tone Refresh",
        "A subtle colour direction to explore a different mood.",
      ],
      [
        "Dimension & Light",
        "An imagined play of light and shade through the hair.",
      ],
      [
        "Creative Colour Consultation",
        "A conversation about references, possibilities and personal expression.",
      ],
    ],
  },
  {
    name: "Styling",
    note: "For the everyday, and the occasion.",
    items: [
      [
        "Occasion Styling",
        "An expressive direction for a moment you want to make your own.",
      ],
      [
        "Everyday Finish",
        "An approach to styling that feels considered and easy to wear.",
      ],
      [
        "Bridal Style Exploration",
        "An illustrative consultation around a personal celebration look.",
      ],
    ],
  },
] as const;
export function Services() {
  const [active, setActive] = useState(0);
  const ready = useHydrated();
  return (
    <section id="services" className="services section wrap">
      <div className="service-intro" data-reveal>
        <p className="eyebrow">02 / The service edit</p>
        <h2>
          Find your
          <br />
          <em>direction.</em>
        </h2>
        <p>
          Start with a feeling.
          <br />
          Find a little inspiration.
        </p>
        <div
          className="category-controls"
          role="group"
          aria-label="Service categories"
        >
          {services.map((service, index) => (
            <button
              key={service.name}
              disabled={!ready}
              aria-pressed={active === index}
              aria-controls={"service-" + index}
              onClick={() => setActive(index)}
            >
              {service.name}
              <ArrowUpRight size={19} aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
      <div className="service-list">
        {services.map((group, index) => (
          <div
            key={group.name}
            id={"service-" + index}
            className="service-group"
            hidden={ready && active !== index}
          >
            <p className="service-mood">{group.note}</p>
            {group.items.map(([title, copy], i) => (
              <article className="service-row" key={title}>
                <span className="service-number">0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        ))}
        <p className="small-note service-disclaimer">
          An illustrative service edit. No real services, prices or appointments
          are offered.
        </p>
      </div>
    </section>
  );
}
